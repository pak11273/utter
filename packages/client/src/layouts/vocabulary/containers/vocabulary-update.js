/* eslint react-hooks/exhaustive-deps:0 */
import React, {Component} from "react"
import {withApollo} from "react-apollo"
import {session} from "brownies"
import {Formik} from "formik"
import makeTrashable from "trashable"

import Add from "@material-ui/icons/Add"
import Check from "@material-ui/icons/Check"
import Clear from "@material-ui/icons/Clear"
import ChevronLeft from "@material-ui/icons/ChevronLeft"
import ChevronRight from "@material-ui/icons/ChevronRight"
import Delete from "@material-ui/icons/Delete"
import Edit from "@material-ui/icons/Edit"
import Filter from "@material-ui/icons/FilterList"
import FirstPage from "@material-ui/icons/FirstPage"
import Grid from "@material-ui/core/Grid"
import LastPage from "@material-ui/icons/LastPage"
import Paper from "@material-ui/core/Paper"
import Search from "@material-ui/icons/Search"
import Typography from "@material-ui/core/Typography"
import {withStyles} from "@material-ui/core/styles"

import {courseVocabularySchema} from "../yupSchemas.js"
import MaterialTable, {MTableEditRow, MTableToolbar} from "material-table"
import {
  GET_VOCABULARIES,
  VOCABULARY_CREATE,
  VOCABULARY_DELETE,
  VOCABULARY_UPDATE
} from "../xhr.js"

import {GET_COURSE} from "../../courses/xhr.js"

import {styles} from "../../styles.js"
import {LevelSelect} from "../components/level-select.js"
import {Flex, FormikMTInput} from "../../../components"

const MuiTableEditRow = ({onEditingApproved, ...props}) => {
  return (
    <Formik
      validationSchema={courseVocabularySchema}
      initialValues={props.data}
      onSubmit={values => {
        console.log("values: ", values)
        if (props.mode === "update") {
          delete values.tableData
        }
        onEditingApproved(props.mode, values, props.data)
      }}
      render={({submitForm}) => (
        <MTableEditRow {...props} onEditingApproved={submitForm} />
      )}
    />
  )
}

class VocabularysUpdate extends Component {
  _isMounted = false

  constructor(props) {
    super(props)

    this.state = {
      /* audioBlob: "", */
      data: []
      /* female: false, */
      /* formErrors: { */
      /*   errors: [] */
      /* }, */
      /* gender: null, */
      /* globalLevels: [], */
      /* labelWidth: 0, */
      /* level: 0, */
      /* male: false, */
      /* modalGender: "", */
      /* modalLevel: "", */
      /* modalWord: "", */
      /* modalTranslation: "", */
      /* modalAudio: "", */
      /* openAudioModal: false, */
      /* openDeleteModal: false, */
      /* secure_url: "", */
      /* value: "level", */
      /* word: "", */
      /* translation: "" */
    }
    this.can = null
    this.tableRef = React.createRef()
  }

  componentDidMount() {
    const {levels} = session
    this.props.client
      .query({
        query: GET_COURSE,
        fetchPolicy: "no-cache",
        variables: {
          _id: session.course._id
        }
      })
      .then(res => {
        session.levels = res.data.getCourse.levels
        session.levelsIdsArr = res.data.getCourse.levelSort
      })

    if (levels.length !== 0) {
      this.props.client
        .query({
          query: GET_VOCABULARIES,
          variables: {
            levelId: levels[0]._id
          }
        })
        .then(res => {
          session.vocabularies = res.data.getVocabularies.vocabularies
          this.setState({
            data: res.data.getVocabularies.vocabularies || []
          })
        })
        .catch(err => console.log("err: ", err))
    }

    if (session.user.username === session.course.owner.username) {
      this.can = {
        onRowAdd: async newData => {
          console.log("new data: ", newData)

          const add = new Promise(resolve => {
            console.log("state: ", this.state)
            const {data} = this.state
            data.push(newData)
            if (this._isMounted) {
              this.setState({
                data
              })
            }

            resolve({newData, data})
          })
          this._addTrash = makeTrashable(add)

          this._addTrash.then(res => {
            const newLevel = this.props.client.mutate({
              mutation: VOCABULARY_CREATE,
              variables: {
                audioUrl: res.audioUrl,
                gender: res.gender,
                level: res.level,
                levelId: res.levelId,
                word: res.word,
                translation: res.translation
              }
            })
            this._newVocabularyTrash = makeTrashable(newLevel)

            this._newVocabularyTrash.then(res => {
              if (this._newVocabularyTrash && this._isMounted) {
                const tempArr = session.vocabularies
                tempArr.push(res.data.vocabularyCreate.vocabulary)
                session.levels = tempArr
                if (this._isMounted) {
                  this.setState({
                    data: tempArr
                  })
                }
                return tempArr
              }
            })
            /* .then(res => { */
            /*   session.levelsIdsArr = this.convertObjIdsToArr(res) */
            /*   const sort = this.props.client.mutate({ */
            /*     mutation: LEVEL_SORT, */
            /*     variables: { */
            /*       courseId: session.course._id, */
            /*       levelSort: session.levelsIdsArr */
            /*     } */
            /*   }) */

            /* this._sortTrash = makeTrashable(sort) */
            /* }) */
          })

          return this._addTrash
        },
        onRowUpdate: newData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              console.log("reject: ", reject)
              var {data} = this.state

              const index = data.findIndex(x => x._id === newData._id)
              data[index] = newData
              this.setState({data})
              resolve(newData)
            }, 1000)
          })
            .then(res => {
              console.log("res: ", res)
              this.props.client.mutate({
                mutation: VOCABULARY_UPDATE,
                variables: {
                  _id: res._id,
                  vocabulary: +res.vocabulary,
                  title: res.title
                }
              })
            })
            .catch(err => console.log("err: ", err)),
        onRowDelete: oldData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              console.log("reject: ", reject)
              const {data} = this.state
              const index = data.indexOf(oldData)
              data.splice(index, 1)
              this.setState({data})
              resolve(oldData)
            }, 1000)
          })
            .then(res => {
              this.props.client.mutate({
                mutation: VOCABULARY_DELETE,
                variables: {
                  _id: res._id
                }
              })
            })
            .catch(err => console.log("err: ", err))
      }
    } else {
      this.can = {}
    }
  }

  componentWillUnmount = () => {
    this._isMounted = false

    // garbage collection
    this._addTrash && this._addTrash.trash()
    this._newVocabularyTrash && this._newVocabularyTrash.trash()
    /* this._sortTrash && this._sortTrash.trash() */
    /* this._updateTrash && this._updateTrash.trash() */
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
              Course Vocabulary
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
                  components={{
                    Toolbar: props => (
                      <Flex flexdirection="row" padding="30px">
                        <LevelSelect />
                        <MTableToolbar {...props} />
                      </Flex>
                    ),
                    EditRow: MuiTableEditRow,
                    EditField: FormikMTInput
                  }}
                  icons={{
                    Add: () => <Add />,
                    Check: () => <Check />,
                    Clear: () => <Clear />,
                    ResetSearch: () => <Clear />,
                    Delete: () => <Delete />,
                    Edit: () => <Edit />,
                    Filter: () => <Filter />,
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
                      render: () => session.level
                    },
                    {title: "word", field: "word"},
                    {title: "translation", field: "translation"},
                    {title: "audio", field: "audio"},
                    {
                      title: "gender",
                      field: "gender",
                      lookup: {
                        none: "none",
                        male: "male",
                        female: "female",
                        neuter: "neuter"
                      }
                    }
                  ]}
                  data={this.state.data}
                  options={{
                    actionsColumnIndex: -1,
                    filtering: true,
                    pageSize: 10,
                    showTitle: false,
                    sorting: false,
                    rowStyle: x => {
                      if (x.vocabulary % 2) {
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

export default withApollo(withStyles(styles)(VocabularysUpdate))
