/* eslint react-hooks/exhaustive-deps:0 */
import React, {useEffect, useState} from "react"
import {withApollo} from "react-apollo"
import {session} from "brownies"

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

import MaterialTable, {MTableToolbar} from "material-table"
import {
  GET_VOCABULARIES,
  VOCABULARY_CREATE,
  VOCABULARY_DELETE,
  VOCABULARY_UPDATE
} from "../xhr.js"

import {GET_COURSE} from "../../courses/xhr.js"

import {styles} from "../../styles.js"
import {LevelSelect} from "../components/level-select.js"
import {Flex} from "../../../components"

const VocabularysUpdate = props => {
  const [state, changeState] = useState({
    audioBlob: "",
    data: [],
    female: false,
    formErrors: {
      errors: []
    },
    gender: null,
    globalLevels: [],
    labelWidth: 0,
    level: 0,
    male: false,
    modalGender: "",
    modalLevel: "",
    modalWord: "",
    modalTranslation: "",
    modalAudio: "",
    openAudioModal: false,
    openDeleteModal: false,
    secure_url: "",
    value: "level",
    word: "",
    translation: ""
  })

  const {levels} = session
  const {classes} = props

  const handleSubmit = () => {}

  useEffect(() => {
    props.client
      .query({
        query: GET_COURSE,
        fetchPolicy: "no-cache",
        variables: {
          _id: session.course._id
        }
      })
      .then(res => {
        console.log("res: ", res)
        session.levels = res.data.getCourse.levels
        session.levelsIdsArr = res.data.getCourse.levelSort
      })

    if (levels.length !== 0) {
      props.client
        .query({
          query: GET_VOCABULARIES,
          variables: {
            levelId: levels[0]._id
          }
        })
        .then(res => {
          session.vocabularies = res.data.getVocabularies.vocabularies
          changeState({
            ...state,
            data: res.data.getVocabularies.vocabularies
          })
        })
        .catch(err => console.log("err: ", err))
    }
  }, [])

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
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
                  )
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
                  {title: "level", field: "level", readonly: true},
                  {title: "word", field: "word"},
                  {title: "translation", field: "translation"},
                  {title: "audio", field: "audio"},
                  {title: "gender", field: "gender"}
                ]}
                data={state.data}
                actions={
                  [
                    /* { */
                    /*   icon: () => <Check />, */
                    /*   tooltip: "Edit Vocabulary" */
                    /*   onClick: (event, rowData) => { */
                    /*     alert("Accept vocabulary: " + rowData.vocabulary) */
                    /*   } */
                    /* } */
                    /* rowData => ({ */
                    /*   icon: () => <Delete />, */
                    /*   tooltip: "Delete Vocabulary", */
                    /*   disabled: rowData.birthYear >= 2000, */
                    /*   onClick: (event, rowData) => { */
                    /*     alert("Delete vocabulary: " + rowData.vocabulary) */
                    /*   } */
                    /* }) */
                  ]
                }
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
                editable={{
                  onRowAdd: newData =>
                    new Promise((resolve, reject) => {
                      setTimeout(() => {
                        console.log("resolve: ", resolve)
                        console.log("reject: ", reject)
                        const {data} = state
                        data.push(newData)
                        changeState({...state, data})
                        resolve(newData)
                      }, 1000)
                    })
                      .then(res => {
                        console.log("res: ", res)
                        props.client.mutate({
                          mutation: VOCABULARY_CREATE,
                          variables: {
                            audioUrl: res.audio,
                            gender: res.gender,
                            levelId: res.levelId,
                            word: res.word,
                            translation: res.translation
                          }
                        })
                      })
                      .catch(err => console.log("err: ", err)),
                  onRowUpdate: newData =>
                    new Promise((resolve, reject) => {
                      setTimeout(() => {
                        console.log("reject: ", reject)
                        var {data} = state

                        const index = data.findIndex(x => x._id === newData._id)
                        data[index] = newData
                        changeState({...state, data})
                        resolve(newData)
                      }, 1000)
                    })
                      .then(res => {
                        console.log("res: ", res)
                        props.client.mutate({
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
                        const {data} = state
                        const index = data.indexOf(oldData)
                        data.splice(index, 1)
                        changeState({...state, data})
                        resolve(oldData)
                      }, 1000)
                    })
                      .then(res => {
                        props.client.mutate({
                          mutation: VOCABULARY_DELETE,
                          variables: {
                            _id: res._id
                          }
                        })
                      })
                      .catch(err => console.log("err: ", err))
                }}
              />
            </div>
          </Grid>
        </Grid>
      </main>
    </form>
  )
}

export default withApollo(withStyles(styles)(VocabularysUpdate))
