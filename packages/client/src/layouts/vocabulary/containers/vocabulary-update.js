/* eslint no-unused-vars: 0 */
import React, {Component} from "react"
import ReactTable from "react-table"
import "react-table/react-table.css"
import {connect} from "react-redux"
import schema from "../../../core/schema.js"

import FormGroup from "@material-ui/core/FormGroup"
import Checkbox from "@material-ui/core/Checkbox"
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank"
import CheckBoxIcon from "@material-ui/icons/CheckBox"

import Button from "@material-ui/core/Button"
import CircularProgress from "@material-ui/core/CircularProgress"
import DeleteIcon from "@material-ui/icons/Delete"
import FormControl from "@material-ui/core/FormControl"
import FormHelperText from "@material-ui/core/FormHelperText"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormLabel from "@material-ui/core/FormLabel"
import Grid from "@material-ui/core/Grid"
import IconButton from "@material-ui/core/IconButton"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import MenuItem from "@material-ui/core/MenuItem"
import OutlinedInput from "@material-ui/core/OutlinedInput"
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import Select from "@material-ui/core/Select"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import {withStyles} from "@material-ui/core/styles"

import {Mutation, Query} from "react-apollo"
import gql from "graphql-tag"
import classNames from "classnames"
import isEmpty from "lodash/isEmpty"
import {vocabularySchema} from "@utterzone/common"
import update from "immutability-helper"

import {Can, Hero, LoaderCircle} from "../../../components"
import {VocabularyAudioModal, VocabularyDeleteModal} from "../components"

import {loadData, resetGlobalLevel} from "../../../api/actions.js"
import {getVocabularies, vocabularyCreate} from "../xhr.js"
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
  globalLevel: 0,
  globalLevels: [],
  labelWidth: 0,
  level: null,
  male: false,
  modalGender: "",
  modalLevel: "",
  modalWord: "",
  modalTranslation: "",
  modalAudio: "",
  openAudioModal: false,
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

  handleAudio = row => () => {
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

      this.setState(
        {
          secure_url: secureUrl
        },
        () => console.log("secureUrl: ", this.state)
      )

      console.log("STATE STAE STAET : ", this.state)

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
      this.setState(
        {
          ...initialState
        },
        () => console.log("state: ", this.state)
      )
    }

    xhr.send(formdata)
  }

  handleGlobalLevelChg = payload => e => {
    e.preventDefault()

    this.props.resetGlobalLevel()

    this.setState(
      {
        globalLevels: payload,
        globalLevel: e.target.value,
        level: e.target.value
      },
      () => {
        const selectedLevel = payload.filter(level => {
          return level.level === this.state.globalLevel
        })

        this.props.loadData({level: selectedLevel[0]})

        console.log("selected: ", selectedLevel[0].level)
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
    const {classes, course, level, user} = this.props

    const audioError = classNames({
      errorClass:
        this.state.formErrors.path === "audio" &&
        !isEmpty(this.state.formErrors.errors)
    })

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
        Header: () => null,
        columns: [
          {
            Header: () => (
              <Typography className={classes.header}>Level</Typography>
            ),
            accessor: "level",
            Cell: row => (
              <Typography className={classes.level}>{row.value}</Typography>
            ),
            minWidth: 60,
            maxWidth: 80
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
            accessor: "audio",
            Cell: props => (
              <Typography className={classes.title}>{props.value}</Typography>
            ),
            minWidth: 100,
            maxWidth: 100
          }
        ]
      },
      {
        Header: row => (
          <div className={classes.addButton}>
            <Mutation mutation={vocabularyCreate}>
              {(vocabularyCreate, {loading, error, data}) => {
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
          console.log("levels; ", levels)

          var {globalLevel} = this.state

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
                      value={this.state.globalLevel}
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
                    return {style: {outline: 0}}
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
                  data={levels.vocabulary}
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
