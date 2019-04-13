/* eslint react-hooks/exhaustive-deps:0 no-plusplus:0 */
import React, {Component} from "react"
import {withApollo} from "react-apollo"
import {Formik} from "formik"
import {session} from "brownies"

import Add from "@material-ui/icons/Add"
import Check from "@material-ui/icons/Check"
import Clear from "@material-ui/icons/Clear"
import ChevronLeft from "@material-ui/icons/ChevronLeft"
import ChevronRight from "@material-ui/icons/ChevronRight"
import Delete from "@material-ui/icons/Delete"
import Edit from "@material-ui/icons/Edit"
import FirstPage from "@material-ui/icons/FirstPage"
import Grid from "@material-ui/core/Grid"
import LastPage from "@material-ui/icons/LastPage"
import Paper from "@material-ui/core/Paper"
import Search from "@material-ui/icons/Search"
import Typography from "@material-ui/core/Typography"
import {withStyles} from "@material-ui/core/styles"

import MaterialTable, {MTableEditRow} from "material-table"
import {courseLevelSchema} from "../../yupSchemas.js"
import {FormikMTInput} from "../../../components"
import {
  GET_LEVELS,
  LEVEL_CREATE,
  LEVEL_DELETE,
  LEVEL_UPDATE,
  LEVEL_SORT
} from "../xhr.js"
import {styles} from "../styles.js"

const MuiTableEditRow = ({onEditingApproved, ...props}) => {
  return (
    <Formik
      validationSchema={courseLevelSchema}
      initialValues={props.data}
      onSubmit={values => {
        /* delete values.tableData */
        onEditingApproved(props.mode, values, props.data)
      }}
      render={({submitForm}) => (
        <MTableEditRow {...props} onEditingApproved={submitForm} />
      )}
    />
  )
}

class LevelsUpdate extends Component {
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
    this.props.client
      .query({
        query: GET_LEVELS,
        variables: {
          courseId: session.course._id
        }
      })
      .then(res => {
        session.levels = res.data.getLevels.levels
        this.setState(
          {
            levels: res.data.getLevels.levels
          },
          () => {
            session.levelsIdsArr = this.convertObjIdsToArr(this.state.levels)
          }
        )
      })
      .catch(err => console.log("err: ", err))

    if (session.user.username === session.course.owner.username) {
      this.can = {
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              const {levels} = this.state
              levels.push(newData)
              this.setState({
                levels
              })
              resolve(newData)
            }, 1000)
          })
            .then(async res => {
              const newLevel = await this.props.client.mutate({
                mutation: LEVEL_CREATE,
                variables: {
                  courseId: session.course._id,
                  title: res.title
                }
              })
              const tempArr = session.levels
              tempArr.push(newLevel.data.levelCreate.level)
              session.levels = tempArr
              session.levelsIdsArr = this.convertObjIdsToArr(session.levels)
              this.setState({
                levels: tempArr
              })
              return session.levelsIdsArr
            })
            .then(async res => {
              await this.props.client.mutate({
                mutation: LEVEL_SORT,
                variables: {
                  courseId: session.course._id,
                  levelSort: res
                }
              })
            })
            .catch(err => console.log("err: ", err)),
        onRowUpdate: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              var {levels} = this.state

              const index = levels.findIndex(x => x._id === newData._id)
              levels[index] = newData
              this.setState({
                levels
              })
              resolve(newData)
            }, 1000)
          })
            .then(res => {
              this.props.client.mutate({
                mutation: LEVEL_UPDATE,
                variables: {
                  _id: res._id,
                  title: res.title
                }
              })
            })
            .catch(err => console.log("err: ", err)),
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
                      readonly: true,
                      render: rowData => rowData && rowData.tableData.id + 1
                    },
                    {
                      title: "id",
                      render: rowData => rowData && rowData._id
                    },
                    {title: "title", field: "title"}
                  ]}
                  components={{
                    EditRow: MuiTableEditRow,
                    EditField: FormikMTInput
                  }}
                  data={this.state.levels}
                  options={{
                    actionsColumnIndex: -1,
                    pageSize: 10,
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
