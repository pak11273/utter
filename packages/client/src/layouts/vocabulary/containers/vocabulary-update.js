import React, {Component} from "react"
import ReactTable from "react-table"
import "react-table/react-table.css"
import {connect} from "react-redux"
import schema from "../../../core/schema.js"

import FormGroup from "@material-ui/core/FormGroup"
import Checkbox from "@material-ui/core/Checkbox"

import Button from "@material-ui/core/Button"
import CircularProgress from "@material-ui/core/CircularProgress"
import FormControl from "@material-ui/core/FormControl"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Grid from "@material-ui/core/Grid"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import MenuItem from "@material-ui/core/MenuItem"
import Select from "@material-ui/core/Select"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import {withStyles} from "@material-ui/core/styles"

import {Mutation, Query} from "react-apollo"
import classNames from "classnames"
import isEmpty from "lodash/isEmpty"
import {vocabularySchema} from "@utterzone/common"
import update from "immutability-helper"

import {VocabularyAudioModal, VocabularyDeleteModal} from "../components"
import {Can, Hero, LoaderCircle, TogglePlay} from "../../../components"

import {loadData, resetGlobalLevel} from "../../../api/actions.js"
import {vocabularyCreate} from "../xhr.js"
import {getLevels} from "../../levels/xhr.js"
import {styles} from "../styles.js"

// actions
import {toggleFooter} from "../../../core/actions/toggle-footer-action.js"

const initialState = {
  audioBlob: "",
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
}

class Vocabulary extends Component {
  constructor(props) {
    super(props)

    this.state = initialState
  }

  componentDidMount() {
    this.setState({
      level: this.props.level.level
    })
    this.props.toggleFooter(false)
  }

  addWord = vocabularyCreate => async e => {
    e.preventDefault()

    // reset errors
    const resetErrors = update(this.state, {
      formErrors: {
        errors: {$set: []}
      }
    })

    this.setState(resetErrors)

    await vocabularySchema.validate(this.state).catch(e => {
      if (e) {
        const newState = update(this.state, {
          formErrors: {$set: e}
        })
        this.setState(newState)
      }
    })

    /* // mutate if no errors */
    if (isEmpty(this.state.formErrors.errors)) {
      this.handleAudioUpload(this.state.audioBlob, vocabularyCreate)
    }
  }

  closeAudioModal = state => {
    this.setState({
      openAudioModal: false,
      audioBlob: state.audioBlob
    })
  }

  onButtonClick = () => {
    const selectedNodes = this.gridApi.getSelectedNodes()
    const selectedData = selectedNodes.map(node => node.data)
    const selectedDataStringPresentation = selectedData
      .map(node => node.make + " " + node.model)
      .join(", ")
    alert(`Selected nodes: ${selectedDataStringPresentation}`)
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  chgGender = gender => () => {
    this.setState({
      gender
    })
  }

  handleAudio = () => () => {
    this.setState({
      openAudioModal: true
      /* modalGender: row.original.gender, */
      /* modalLevel: row.original.level, */
      /* modalWord: row.original.word, */
      /* modalTranslation: row.original.translation, */
      /* modalAudio: row.original.audio */
    })
  }

  handleAudioUpload = async (file, vocabularyCreate) => {
    var formdata = new FormData()

    formdata.append("file", file)
    formdata.append("cloud_name", "dgvw5b6pf")
    formdata.append("upload_preset", "z28ks5gg")
    formdata.append("api_key", "225688292439754")

    var xhr = new XMLHttpRequest()
    xhr.open(
      "POST",
      "https://api.cloudinary.com/v1_1/cloud_name/video/upload",
      true
    )

    xhr.onload = async () => {
      const secureUrl = await JSON.parse(xhr.responseText).secure_url

      this.setState({
        secure_url: secureUrl
      })

      vocabularyCreate({
        variables: {
          input: {
            audioUrl: this.state.secure_url,
            courseId: this.props.course.id,
            gender: this.state.gender,
            level: this.state.level,
            translation: this.state.translation,
            word: this.state.word
          }
        }
      })

      // reset state
      this.setState({
        audioBlob: "",
        female: false,
        formErrors: {
          errors: []
        },
        gender: null,
        globalLevels: [],
        labelWidth: 0,
        male: false,
        modalGender: "",
        modalWord: "",
        modalTranslation: "",
        modalAudio: "",
        openAudioModal: false,
        secure_url: "",
        value: "level",
        word: "",
        translation: ""
      })
    }

    xhr.send(formdata)
  }

  handleDelete = row => () => {
    this.setState({
      openDeleteModal: true,
      modalLevel: row.original.level,
      modalTitle: row.original.title
    })
  }

  handleGlobalLevelChg = levels => e => {
    e.preventDefault()

    this.props.resetGlobalLevel()

    this.setState(
      {
        globalLevels: levels,
        level: e.target.value
      },
      () => {
        const selectedLevel = levels.filter(level => {
          return level.level === this.state.level
        })

        this.props.loadData({level: selectedLevel[0]})
      }
    )
  }

  handleFemaleChg = e => {
    e.preventDefault()
    this.setState({
      female: e.target.checked,
      male: false
    })
  }

  handleMaleChg = e => {
    e.preventDefault()
    this.setState({
      male: e.target.checked,
      female: false
    })
  }

  render() {
    var {classes, course, level, user} = this.props
    /* const audioError = classNames({ */
    /*   errorClass: */
    /*     this.state.formErrors.path === "audio" && */
    /*     !isEmpty(this.state.formErrors.errors) */
    /* }) */
    !level ? (level = 0) : null

    const levelError = classNames({
      errorClass:
        this.state.formErrors.path === "level" &&
        !isEmpty(this.state.formErrors.errors)
    })

    const wordError = classNames({
      errorClass:
        this.state.formErrors.path === "word" &&
        !isEmpty(this.state.formErrors.errors)
    })

    const translationError = classNames({
      errorClass:
        this.state.formErrors.path === "translation" &&
        !isEmpty(this.state.formErrors.errors)
    })

    const genderError = classNames({
      errorClass:
        this.state.formErrors.path === "gender" &&
        !isEmpty(this.state.formErrors.errors)
    })

    const formErrors = this.state.formErrors.errors.map((error, i) => {
      return (
        <ListItem key={i}>
          <Typography className={classes.errors}>{error}</Typography>
        </ListItem>
      )
    })

    const columns = [
      {
        Header: () => (
          <Can
            roles={user.roles}
            perform="course:update-vocabulary"
            id={user.username}
            matchingID={course.owner.username}
            yes={() => (
              <TextField
                className={`${classes[wordError]} ${classes.inputHeader}`}
                fullWidth
                id="outlined-bare"
                margin="normal"
                name="word"
                onChange={this.onChange}
                placeholder="Add a new word here."
                value={this.state.word}
                variant="outlined"
              />
            )}
            no={() => null}
          />
        ),
        columns: [
          {
            Header: () => (
              <Typography className={classes.header}>Word</Typography>
            ),
            accessor: "word",
            Cell: props => (
              <Typography className={classes.title}>{props.value}</Typography>
            )
          }
        ]
      },
      {
        Header: () => (
          <Can
            roles={user.roles}
            perform="course:update-vocabulary"
            id={user.username}
            matchingID={course.owner.username}
            yes={() => (
              <TextField
                className={`${classes[translationError]} ${
                  classes.inputHeader
                }`}
                fullWidth
                id="outlined-bare"
                margin="normal"
                name="translation"
                onChange={this.onChange}
                placeholder="And the translation to that word here."
                value={this.state.translation}
                variant="outlined"
              />
            )}
            no={() => null}
          />
        ),
        columns: [
          {
            Header: () => (
              <Typography className={classes.header}>Translation</Typography>
            ),
            accessor: "translation",
            Cell: props => (
              <Typography className={classes.title}>{props.value}</Typography>
            )
          }
        ]
      },
      {
        Header: () => (
          <Can
            roles={user.roles}
            perform="course:update-vocabulary"
            id={user.username}
            matchingID={course.owner.username}
            yes={() => (
              <FormGroup
                row
                className={`${classes[genderError]} ${classes.genderHeader}`}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.male}
                      onChange={this.handleMaleChg}
                      onClick={this.chgGender("male")}
                      value="male"
                    />
                  }
                  label="M"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.female}
                      onChange={this.handleFemaleChg}
                      onClick={this.chgGender("female")}
                      value="female"
                    />
                  }
                  label="F"
                />
              </FormGroup>
            )}
            no={() => null}
          />
        ),
        columns: [
          {
            Header: () => (
              <Typography className={classes.header}>Gender</Typography>
            ),
            accessor: "gender",
            Cell: props => (
              <Typography className={classes.title}>{props.value}</Typography>
            ),
            minWidth: 175,
            maxWidth: 175
          }
        ]
      },
      {
        Header: () => (
          <Can
            roles={user.roles}
            perform="course:update-vocabulary"
            id={user.username}
            matchingID={course.owner.username}
            yes={row => (
              <VocabularyAudioModal
                row={row}
                {...this.state}
                closeAudioModal={this.closeAudioModal}
                handleAudio={this.handleAudio}
              />
            )}
            no={() => null}
          />
        ),
        columns: [
          {
            Header: () => (
              <Typography className={classes.header}>Audio</Typography>
            ),
            accessor: "audioUrl",
            Cell: props => {
              if (props.value) {
                return <TogglePlay src={props.value} />
              }
            },
            minWidth: 100,
            maxWidth: 100
          }
        ]
      },
      {
        Header: () => (
          <div className={classes.addButton}>
            <Mutation
              mutation={vocabularyCreate}
              update={(cache, {data: {vocabularyCreate}}) => {
                try {
                  var getVocabulary = cache.readQuery({
                    query: getLevels,
                    variables: {courseId: this.props.course.id}
                  })
                  var {levels} = getVocabulary.getLevels
                  cache.writeQuery({
                    query: getLevels,
                    variables: {
                      courseId: this.props.course.id
                    },
                    data: {
                      getLevels: {
                        levels: levels.concat([vocabularyCreate.level])
                      }
                    }
                  })
                } catch (err) {
                  console.log("err: ", err)
                }
              }}>
              {(vocabularyCreate, {loading}) => {
                return loading ? (
                  <CircularProgress />
                ) : (
                  <Can
                    roles={user.roles}
                    perform="course:update-vocabulary"
                    id={user.username}
                    matchingID={course.owner.username}
                    yes={() => (
                      <Button
                        type="submit"
                        onClick={this.addWord(vocabularyCreate)}>
                        Add Word
                      </Button>
                    )}
                    no={() => null}
                  />
                )
              }}
            </Mutation>
          </div>
        ),
        columns: [
          {
            Header: () => (
              <Can
                roles={user.roles}
                perform="course:update-vocabulary"
                id={user.username}
                matchingID={course.owner.username}
                yes={() => (
                  <Typography className={classes.header}>Edit</Typography>
                )}
                no={() => null}
              />
            ),
            Cell: row => (
              <Can
                roles={user.roles}
                perform="course:update-vocabulary"
                id={user.username}
                matchingID={course.owner.username}
                yes={() => (
                  <VocabularyDeleteModal
                    row={row}
                    {...this.state}
                    closeDeleteModal={this.closeDeleteModal}
                    handleDelete={this.handleDelete}
                  />
                )}
                no={() => null}
              />
            ),
            minWidth: 90,
            maxWidth: 100
          }
        ]
      }
    ]
    return (
      <Query
        errorPolicy="all"
        query={getLevels}
        variables={{
          courseId: course.id
        }}>
        {({loading, error, data}) => {
          if (loading) {
            return <LoaderCircle />
          }
          if (error)
            return (
              <Grid>
                <pre>
                  {error.graphQLErrors.map(({message}, i) => (
                    <p
                      style={{
                        fontSize: "1em",
                        color: "red",
                        margin: "30px",
                        padding: "30px",
                        textAlign: "center"
                      }}
                      key={i}>
                      {message}
                    </p>
                  ))}
                </pre>
              </Grid>
            )

          const {levels} = data.getLevels
          var tableData

          const dataLevel = levels.filter(item => {
            return item.level === level.level
          })

          if (dataLevel[0]) {
            tableData = dataLevel[0].vocabulary
          }

          return (
            <Grid container direction="column">
              <Hero title="Vocabulary">
                <Grid container alignItems="center" justify="center">
                  <Typography variant="h6" style={{paddingRight: "20px"}}>
                    Choose a level
                  </Typography>
                  <FormControl
                    className={`${classes[levelError]}`}
                    variant="outlined">
                    <Select
                      value={level ? level.level : 0}
                      className={classes.formControl}
                      onChange={this.handleGlobalLevelChg(levels)}>
                      {levels.map(item => {
                        return (
                          <MenuItem key={item.level} value={item.level}>
                            {item.level}
                          </MenuItem>
                        )
                      })}
                    </Select>
                  </FormControl>
                </Grid>
              </Hero>
              <List>{formErrors}</List>
              <Grid item>
                <ReactTable
                  getTheadThProps={() => {
                    return {style: {outline: 0, textAlign: "left"}}
                  }}
                  getTheadGroupThProps={() => {
                    return {
                      style: {
                        alignItems: "center",
                        display: "flex",
                        justifyContent: "center",
                        margin: "30px auto",
                        outline: 0,
                        whiteSpace: "inherit"
                      }
                    }
                  }}
                  className="-striped -highlight"
                  data={tableData}
                  columns={columns}
                  defaultPageSize={10}
                />
              </Grid>
              <Grid item style={{display: "flex", justifyContent: "center"}} />
            </Grid>
          )
        }}
      </Query>
    )
  }
}

const mapStateToProps = state => {
  const session = schema.session(state.apiReducer)
  const {User, Course, Level} = session
  const userObj = User.all().toRefArray()
  const courseObj = Course.all().toRefArray()
  const levelObj = Level.all().toRefArray()
  var user = userObj[0]
  var course = courseObj[0]
  var level = levelObj[0]

  return {
    user,
    course,
    level
  }
}

const actions = {
  loadData,
  resetGlobalLevel,
  toggleFooter
}

export default connect(
  mapStateToProps,
  actions
)(withStyles(styles)(Vocabulary))
