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
      vocabulary: [],
      level: session.level
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
    session.level = ""
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

    /* if (levels.length !== 0) { */
    /*   console.log("SUP WORLD") */
    /*   console.log("levels; ", levels[0]._id) */
    /*   this.props.client */
    /*     .query({ */
    /*       query: GET_VOCABULARIES, */
    /*       variables: { */
    /*         level: levels[0]._id */
    /*       } */
    /*     }) */
    /*     .then(res => { */
    /*       console.log("res: ", res) */
    /*       session.vocabularies = res.data.getVocabularies.vocabulary */
    /*       this.setState( */
    /*         { */
    /*           vocabulary: res.data.getVocabularies.vocabulary || [] */
    /*         }, */
    /*         console.log("state: ", this.state) */
    /*       ) */
    /*     }) */
    /*     .catch(err => console.log("err: ", err)) */
    /* } */

    if (session.user.username === session.course.owner.username) {
      this.can = {
        onRowAdd: async newData => {
          const add = new Promise(resolve => {
            const {vocabulary} = this.state
            vocabulary.push(newData)
            if (this._isMounted) {
              this.setState(
                {
                  vocabulary
                },
                () => console.log("state: ", this.state)
              )
            }

            resolve({newData, vocabulary})
          })
          this._addTrash = makeTrashable(add)

          this._addTrash.then(res => {
            console.log("res: ", res)
            console.log("session level: ", session.level)
            console.log("level ids: ", session.levelsIdsArr)
            console.log("levelID: ", session.levelsIdsArr[session.level - 1])
            const {newData} = res
            const newLevel = this.props.client.mutate({
              mutation: VOCABULARY_CREATE,
              variables: {
                audioUrl: newData.audioUrl || null,
                gender: newData.gender || "none",
                level: session.levelsIdsArr[session.level - 1],
                word: newData.word,
                translation: newData.translation
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
                    vocabulary: tempArr
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
              var {vocabulary} = this.state

              const index = vocabulary.findIndex(x => x._id === newData._id)
              vocabulary[index] = newData
              this.setState({vocabulary})
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
              const {vocabulary} = this.state
              const index = vocabulary.indexOf(oldData)
              vocabulary.splice(index, 1)
              this.setState({vocabulary})
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

  causeRender = level => {
    this.setState(
      {
        level
      },
      () => {
        this.props.client
          .query({
            query: GET_VOCABULARIES,
            variables: {
              level
            }
          })
          .then(res => {
            console.log("res: ", res)
            session.vocabularies = res.data.getVocabularies.vocabulary
            this.setState(
              {
                vocabulary: res.data.getVocabularies.vocabulary || []
              },
              console.log("state: ", this.state)
            )
          })
          .catch(err => console.log("err: ", err))
      }
    )
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
                        <LevelSelect causeRender={this.causeRender} />
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
                    {
                      title: "id",
                      render: rowData => rowData && rowData._id
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
                  data={this.state.vocabulary}
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
