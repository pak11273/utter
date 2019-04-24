/* eslint react-hooks/exhaustive-deps:0, no-plusplus:0, no-new:0, prefer-promise-reject-errors: 0 */
import React, {Component} from "react"
import {withApollo} from "react-apollo"
import {session} from "brownies"
import {Formik} from "formik"
import makeTrashable from "trashable"
import Can from "../../../components/can"

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
import IconButton from "@material-ui/core/IconButton"
import LastPage from "@material-ui/icons/LastPage"
import Mic from "@material-ui/icons/Mic"
import Play from "@material-ui/icons/PlayArrow"
import Paper from "@material-ui/core/Paper"
import Search from "@material-ui/icons/Search"
import Typography from "@material-ui/core/Typography"
import {withStyles} from "@material-ui/core/styles"
import {getPublicId} from "../../../utils/cloudinary-utils.js"

import {courseVocabularySchema} from "../yupSchemas.js"
import MaterialTable, {MTableEditRow, MTableToolbar} from "material-table"
import {
  GET_VOCABULARIES,
  VOCABULARY_AUDIO_DELETE,
  VOCABULARY_CREATE,
  VOCABULARY_DELETE,
  VOCABULARY_UPDATE
} from "../xhr.js"

import {GET_COURSE} from "../../courses/xhr.js"

import {styles} from "../../styles.js"
import {LevelSelect, VocabularyAudioModal} from "../components"
import {Flex, FormikMTInput} from "../../../components"

const MuiEditField = props => {
  if (props.columnDef.title === "audio") {
    return null
  }
  return <FormikMTInput {...props} />
}

const MuiTableEditRow = ({onEditingApproved, ...props}) => {
  return (
    <Formik
      validationSchema={courseVocabularySchema}
      initialValues={props.data}
      onSubmit={values => {
        // TODO: this causes error if you double-click edit icon, fix this...
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
  _isMounted = true

  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      level: session.level,
      openModal: false,
      rowData: null,
      vocabulary: []
    }

    this.can = null
  }

  componentDidMount = async () => {
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
      .catch(err => console.log("err: ", err))

    if (session.user.username === session.course.owner.username) {
      this.can = {
        onRowAdd: async newData => {
          const add = new Promise(resolve => {
            const {vocabulary} = this.state
            vocabulary.push(newData)
            if (this._isMounted) {
              this.setState({
                vocabulary
              })
            }

            resolve({newData, vocabulary})
          })
          this._addTrash = makeTrashable(add)

          this._addTrash.then(res => {
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
                const tempArr = session.vocabulary
                tempArr.push(res.data.vocabularyCreate.vocabulary)
                session.vocabulary = tempArr
                if (this._isMounted) {
                  this.setState({
                    vocabulary: session.vocabulary
                  })
                }
                return tempArr
              }
            })
          })

          return this._addTrash
        },

        onRowUpdate: (newData, oldData) => {
          const update = new Promise(resolve => {
            const {vocabulary} = this.state
            const index = vocabulary.indexOf(oldData)
            vocabulary[index] = newData
            setTimeout(() => {
              this.setState({vocabulary}, () => {
                session.vocabulary = vocabulary
                resolve()
              })
            }, 1000)
            this.props.client.mutate({
              mutation: VOCABULARY_UPDATE,
              variables: {
                _id: newData._id,
                word: newData.word,
                translation: newData.translation,
                audioUrl: newData.audioUrl,
                gender: newData.gender
              }
            })
          })

          this._updateTrash = makeTrashable(update)
          return update
        },

        onRowDelete: async selectedRow => {
          const tempVocabulary = [...session.vocabulary]

          const deletedInfo = await new Promise(resolve => {
            setTimeout(() => {
              var index = -1
              for (var i = 0; i < session.vocabulary.length; i++) {
                if (session.vocabulary[i].word === selectedRow.word) {
                  index = i
                  break
                }
              }
              var splice = tempVocabulary.splice(index, 1)
              resolve({
                splicedVocabulary: tempVocabulary,
                spliced: splice[0],
                deletedIndex: index
              })
            }, 1000)
          })

          const {splicedVocabulary, spliced, deletedIndex} = deletedInfo

          this.setState(
            {
              vocabulary: splicedVocabulary
            },
            () => {
              session.vocabulary = splicedVocabulary
            }
          )

          if (selectedRow.audioUrl) {
            var public_id = getPublicId(selectedRow.audioUrl)
          } else {
            public_id = null
          }
          const deletedWord = await this.props.client.mutate({
            mutation: VOCABULARY_DELETE,
            variables: {
              _id: spliced._id,
              public_id
            }
          })

          session.vocabulary.splice(deletedIndex, 1)

          this.setState({
            vocabulary: session.vocabulary
          })
          return deletedWord
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
    this._newVocabularyTrash && this._newVocabularyTrash.trash()
    this._updateTrash && this._updateTrash.trash()
  }

  closeModal = () => {
    this.setState({
      openModal: false
    })
  }

  causeRender = level => {
    this.setState(
      {
        level
      },
      () => {
        this.props.client
          .query({
            fetchPolicy: "no-cache",
            query: GET_VOCABULARIES,
            variables: {
              level
            }
          })
          .then(res => {
            session.vocabulary = res.data.getVocabularies.vocabulary
            this.setState({
              vocabulary: res.data.getVocabularies.vocabulary || []
            })
          })
          .catch(err => console.log("err: ", err))
      }
    )
  }

  modalConfig = rowData => {
    this.setState({
      openModal: true,
      rowData
    })
  }

  deleteAudio = async rowData => {
    const public_id = getPublicId(rowData.audioUrl)
    this.setState({
      isLoading: true
    })
    this.props.client
      .mutate({
        mutation: VOCABULARY_AUDIO_DELETE,
        variables: {
          _id: rowData._id,
          public_id
        }
      })
      .then(res => {
        this.setState({
          isLoading: false
        })
        this.causeRender(res.data.vocabularyAudioDelete.vocabulary.level)
      })
      .catch(err => console.log("err: ", err))
  }

  playAudio = rowData => {
    const a = new Audio(rowData.audioUrl)
    a.play()
  }

  resetOpenModal = () => {
    this.setState({
      openModal: false
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
                  isLoading={this.state.isLoading}
                  components={{
                    Toolbar: props => (
                      <Flex flexdirection="row" padding="30px">
                        <LevelSelect causeRender={this.causeRender} />
                        <MTableToolbar {...props} />
                      </Flex>
                    ),
                    EditRow: MuiTableEditRow,
                    EditField: MuiEditField
                  }}
                  icons={{
                    Add: () => <Add />,
                    Check: () => <Check />,
                    Clear: () => <Clear />,
                    Delete: () => <Delete />,
                    Edit: () => <Edit />,
                    Filter: () => <Filter />,
                    FirstPage: () => <FirstPage />,
                    LastPage: () => <LastPage />,
                    NextPage: () => <ChevronRight />,
                    PreviousPage: () => <ChevronLeft />,
                    ResetSearch: () => <Clear />,
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
                    {
                      title: "audio",
                      editComponent: () => <div>8null</div>,
                      field: "audioUrl",
                      filtering: false,
                      readonly: true,
                      render: rowData => {
                        if (rowData && rowData.audioUrl) {
                          return (
                            <Flex flexdirection="row">
                              <IconButton
                                onClick={() => this.playAudio(rowData)}>
                                <Play />
                              </IconButton>
                              <Can
                                roles={session.user.roles}
                                perform="course:update-vocabulary"
                                id={session.user.username}
                                matchingID={session.course.owner.username}
                                yes={() => (
                                  <IconButton
                                    onClick={() => this.deleteAudio(rowData)}>
                                    <Delete />
                                  </IconButton>
                                )}
                                no={() => null}
                              />
                            </Flex>
                          )
                        }
                        return (
                          <Can
                            roles={session.user.roles}
                            perform="course:update-vocabulary"
                            id={session.user.username}
                            matchingID={session.course.owner.username}
                            yes={() => (
                              <div>
                                <IconButton
                                  type="button"
                                  onClick={() => this.modalConfig(rowData)}>
                                  <Mic />
                                </IconButton>
                                <VocabularyAudioModal
                                  causeRender={this.causeRender}
                                  selectedLevel={this.state.level}
                                  closeModal={this.closeModal}
                                  openModal={this.state.openModal}
                                  resetOpenModal={this.resetOpenModal}
                                  rowData={this.state.rowData}
                                />
                              </div>
                            )}
                            no={() => null}
                          />
                        )
                      }
                    },
                    {
                      title: "gender",
                      field: "gender",
                      lookup: {
                        none: "",
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
                    pageSize: 5,
                    showTitle: false,
                    sorting: true,
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
