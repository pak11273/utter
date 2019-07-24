/* eslint react-hooks/exhaustive-deps:0, no-plusplus:0, no-new:0, prefer-promise-reject-errors: 0 */
import React, {Component} from "react"
import {withApollo} from "react-apollo"
import {Formik} from "formik"
import {cookies, session} from "brownies"
import makeTrashable from "trashable"

import Add from "@material-ui/icons/Add"
import Check from "@material-ui/icons/Check"
import Clear from "@material-ui/icons/Clear"
import ChevronLeft from "@material-ui/icons/ChevronLeft"
import ChevronRight from "@material-ui/icons/ChevronRight"
import {CircularProgress} from "@material-ui/core"
import Delete from "@material-ui/icons/Delete"
import Edit from "@material-ui/icons/Edit"
import {fade} from "@material-ui/core/styles/colorManipulator"
import FirstPage from "@material-ui/icons/FirstPage"
import Grid from "@material-ui/core/Grid"
import LastPage from "@material-ui/icons/LastPage"
import Paper from "@material-ui/core/Paper"
import Search from "@material-ui/icons/Search"
import Typography from "@material-ui/core/Typography"
import {withStyles} from "@material-ui/core/styles"

import Loading from "../../../components/loaders/layout-loader.js"
import Loadable from "react-loadable"

const MaterialTable = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'material-table' */ "material-table"),
  loading: Loading,
  delay: 200
})

const MTableEditRow = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'material-table-edit-row' */ "material-table").then(
      mod => mod.MTableEditRow
    ),
  loading: Loading,
  delay: 200
})
import {courseLevelSchema} from "../../yupSchemas.js"
import {FormikMTInput} from "../../../components"
import {GET_LEVELS} from "../../../graphql/queries/level-queries.js"
import {
  LEVEL_CREATE,
  LEVEL_DELETE,
  LEVEL_UPDATE,
  LEVEL_SORT
} from "../../../graphql/mutations/level-mutations.js"
import {GET_USER_BY_TOKEN} from "../../../graphql/queries/user-queries.js"
import {styles} from "../styles.js"

const OverlayOverride = props => {
  return (
    <div
      style={{
        display: "table",
        width: "100%",
        height: "100%",
        backgroundColor: fade(props.theme.palette.background.paper, 0.7)
      }}>
      <div
        style={{
          display: "table-cell",
          width: "100%",
          height: "100%",
          verticalAlign: "middle",
          textAlign: "center"
        }}>
        <CircularProgress />
      </div>
    </div>
  )
}

const MuiTableEditRow = ({onEditingApproved, ...props}) => {
  return (
    <Formik
      validationSchema={courseLevelSchema}
      initialValues={props.data}
      onSubmit={values => {
        if (props.mode === "update") {
          delete values.tableData
        }
        if (props.mode === "add") {
          if (!props.data) {
            props.data = {}
          }
        }

        onEditingApproved(props.mode, values, props.data)
      }}
      render={({submitForm}) => (
        <MTableEditRow {...props} onEditingApproved={submitForm} />
      )}
    />
  )
}

class LevelsUpdate extends Component {
  /* _addTrash = null */

  _isMounted = false

  constructor(props) {
    super(props)
    this.state = {
      levels: []
    }
    this.can = null
    this.levelsIdsArr = []
    this.tableRef = React.createRef()
  }

  componentDidMount() {
    this._isMounted = true
    this.props.client
      .query({
        query: GET_LEVELS,
        fetchPolicy: "no-cache",
        variables: {
          courseId: session.course._id
        }
      })
      .then(res => {
        session.levels = res.data.getLevels.levels
        if (this._isMounted) {
          this.setState(
            {
              levels: res.data.getLevels.levels
            },
            () => {
              session.levelsIdsArr = this.convertObjIdsToArr(this.state.levels)
              console.log(this.state)
            }
          )
        }
      })
      .catch(err => console.log("err: ", err))

    if (session.user.username === session.course.owner.username) {
      this.can = {
        onRowAdd: async newData => {
          const add = new Promise(resolve => {
            const {levels} = this.state
            levels.push(newData)
            if (this._isMounted) {
              this.setState({
                levels
              })
            }

            resolve({newData, levels})
          })
          this._addTrash = makeTrashable(add)

          this._addTrash.then(res => {
            const newLevel = this.props.client.mutate({
              mutation: LEVEL_CREATE,
              variables: {
                courseId: session.course._id,
                title: res.newData.title,
                modifier: res.newData.modifier
              },
              refetchQueries: [
                {query: GET_USER_BY_TOKEN, variables: {token: cookies._uid}}
              ]
            })
            this._newLevelTrash = makeTrashable(newLevel)

            this._newLevelTrash
              .then(res => {
                if (this._newLevelTrash && this._isMounted) {
                  const tempArr = session.levels
                  tempArr.push(res.data.levelCreate.level)
                  session.levels = tempArr
                  if (this._isMounted) {
                    this.setState({
                      levels: tempArr
                    })
                  }
                  return tempArr
                }
              })
              .then(res => {
                session.levelsIdsArr = this.convertObjIdsToArr(res)
                session.level =
                  session.levelsIdsArr.length >= 1
                    ? session.levelsIdsArr.length
                    : ""
                const sort = this.props.client.mutate({
                  mutation: LEVEL_SORT,
                  variables: {
                    courseId: session.course._id,
                    levelSort: session.levelsIdsArr
                  }
                })

                this._sortTrash = makeTrashable(sort)
              })
          })

          return this._addTrash
        },

        onRowUpdate: (newData, oldData) => {
          const update = new Promise(resolve => {
            const {levels} = this.state
            const index = levels.indexOf(oldData)
            levels[index] = newData
            setTimeout(() => {
              this.setState({levels}, () => {
                session.levels = levels
                session.levelsIdsArr = this.convertObjIdsToArr(levels)
                resolve()
              })
            }, 1000)
            this.props.client.mutate({
              mutation: LEVEL_UPDATE,
              variables: {
                _id: newData._id,
                title: newData.title,
                modifier: newData.modifier
              }
            })
          })

          this._updateTrash = makeTrashable(update)
          return update
        },

        onRowDelete: async selectedRow => {
          const tempLevels = [...session.levels]
          const deletedInfo = await new Promise(resolve => {
            setTimeout(() => {
              var index = -1
              for (var i = 0; i < session.levels.length; i++) {
                if (session.levels[i].title === selectedRow.title) {
                  index = i
                  break
                }
              }
              var splice = tempLevels.splice(index, 1)
              resolve({
                splicedLevels: tempLevels,
                spliced: splice[0],
                deletedIndex: index
              })
            }, 1000)
          })

          const {splicedLevels, spliced, deletedIndex} = deletedInfo

          this.setState(
            {
              levels: splicedLevels
            },
            () => (session.levels = splicedLevels)
          )

          session.levelsIdsArr = this.convertObjIdsToArr(splicedLevels)

          await this.props.client.mutate({
            mutation: LEVEL_DELETE,
            variables: {
              _id: spliced._id
            }
          })

          session.levels.splice(deletedIndex, 1)

          this.setState({
            levels: session.levels
          })

          await this.props.client.mutate({
            mutation: LEVEL_SORT,
            variables: {
              courseId: session.course._id,
              levelSort: session.levelsIdsArr
            }
          })
        }
      }
    } else {
      this.can = {}
    }
  }

  componentWillUnmount = () => {
    this._isMounted = false

    // garbage collection
    this._addTrash && this._addTrash.trash()
    this._newLevelTrash && this._newLevelTrash.trash()
    this._sortTrash && this._sortTrash.trash()
    this._updateTrash && this._updateTrash.trash()
  }

  convertObjIdsToArr = arr => {
    return arr.map(item => {
      return item._id
    })
  }

  render() {
    const {classes} = this.props
    return (
      <div className={classes.root}>
        <Grid
          className={classes.hero}
          container
          justify="center"
          direction="column">
          <Paper className={classes.header} elevation={1}>
            <Typography
              className={classes.headerBody}
              variant="h4"
              align="center"
              gutterBottom>
              Course Levels
            </Typography>
          </Paper>
        </Grid>
        <main className={classes.content}>
          <Grid container spacing={24}>
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
            />
            <Grid item xs={12} align="center">
              <div style={{maxWidth: "100%"}}>
                <MaterialTable
                  ref={this.tableRef}
                  icons={{
                    Add: () => <Add />,
                    Check: () => <Check />,
                    Clear: () => <Clear />,
                    ResetSearch: () => <Clear />,
                    Delete: () => <Delete />,
                    Edit: () => <Edit />,
                    FirstPage: () => <FirstPage />,
                    LastPage: () => <LastPage />,
                    NextPage: () => <ChevronRight />,
                    PreviousPage: () => <ChevronLeft />,
                    Search: () => <Search />
                  }}
                  columns={[
                    {
                      title: "level",
                      headerStyle: {width: "50px"},
                      readonly: true,
                      render: rowData => rowData && rowData.tableData.id + 1
                    },
                    {title: "title", field: "title"},
                    {
                      title: "modifier",
                      field: "modifier"
                    }
                  ]}
                  components={{
                    EditRow: MuiTableEditRow,
                    EditField: FormikMTInput,
                    OverlayLoading: OverlayOverride
                  }}
                  data={this.state.levels}
                  options={{
                    actionsColumnIndex: -1,
                    pageSize: 5,
                    showTitle: false,
                    sorting: false,
                    rowStyle: x => {
                      if (x.tableData.id % 2) {
                        return {backgroundColor: "#f2f2f2"}
                      }
                    }
                  }}
                  editable={this.can}
                />
              </div>
            </Grid>
          </Grid>
        </main>
      </div>
    )
  }
}

export default withApollo(withStyles(styles)(LevelsUpdate))
