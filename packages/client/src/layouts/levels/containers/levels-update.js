/* eslint no-unused-vars: 0 */
import React, {PureComponent} from "react"
import ReactTable from "react-table"
import update from "immutability-helper"
import "react-table/react-table.css"
import {connect} from "react-redux"

import Button from "@material-ui/core/Button"
import CircularProgress from "@material-ui/core/CircularProgress"
import Grid from "@material-ui/core/Grid"
import DeleteIcon from "@material-ui/icons/Delete"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import IconButton from "@material-ui/core/IconButton"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import {withStyles} from "@material-ui/core/styles"

/* components */
import {LevelDeleteModal} from "../components"
import {Can, Hero, LoaderCircle} from "../../../components"

import {graphql, Mutation, Query} from "react-apollo"
import gql from "graphql-tag"
import classNames from "classnames"
import isEmpty from "lodash/isEmpty"
import schema from "../../../core/schema.js"
import * as yup from "yup"

import {levelSchema} from "@utterzone/common"
import {styles} from "../styles.js"

import {getLevels, levelCreate} from "../xhr.js"

// actions
/* import {loadData} from "../../../api/actions.js" */
import {toggleFooter} from "../../../core/actions/toggle-footer-action.js"

class Levels extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      courseId: this.props.course.id,
      formErrors: {
        errors: []
      },
      modalLevel: "",
      modalTitle: "",
      openDeleteModal: false,
      title: "",
      level: ""
    }
  }

  componentDidMount() {
    this.props.toggleFooter(false)
  }

  addLevel = levelCreate => async e => {
    e.preventDefault()

    // reset errors
    const resetErrors = update(this.state, {
      formErrors: {
        errors: {$set: []}
      }
    })
    this.setState(resetErrors)

    await levelSchema.validate(this.state).catch(e => {
      if (e) {
        const newState = update(this.state, {
          formErrors: {$set: e}
        })
        this.setState(newState)
      }
    })

    // mutate if no errors
    if (isEmpty(this.state.formErrors.errors)) {
      levelCreate({
        variables: {
          input: {
            courseId: this.props.course.id,
            level: this.state.level,
            title: this.state.title
          }
        }
      })
    }

    // reset state
    const labelState = update(this.state, {
      openDeleteModal: {$set: false},
      title: {$set: ""},
      level: {$set: ""}
    })
    this.setState(labelState)
  }

  onChange = e => {
    if (e.target.name === "level") {
      this.setState({
        [e.target.name]: Number(e.target.value)
      })
    } else {
      this.setState({
        [e.target.name]: e.target.value
      })
    }
  }

  handleDelete = row => () => {
    this.setState({
      openDeleteModal: true,
      modalLevel: row.original.level,
      modalTitle: row.original.title
    })
  }

  closeDeleteModal = () => {
    this.setState({
      openDeleteModal: false
    })
  }

  deleteLevel = DELETE_LEVEL => e => {
    e.preventDefault()

    if (isEmpty(this.state.formErrors.errors)) {
      DELETE_LEVEL({
        variables: {
          input: {
            courseId: this.props.course.id,
            level: this.state.level
          }
        }
      })
    }

    // reset state
    const labelState = update(this.state, {
      title: {$set: ""},
      level: {$set: ""}
    })
    this.setState(labelState)
  }

  render() {
    console.log("props: ", this.props)
    const {classes, course, level, user} = this.props
    const levelError = classNames({
      errorClass:
        this.state.formErrors.path === "level" &&
        !isEmpty(this.state.formErrors.errors)
    })

    const titleError = classNames({
      errorClass:
        this.state.formErrors.path === "title" &&
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
            perform="course:update-levels"
            id={user.username}
            matchingID={course.owner.username}
            yes={() => (
              <TextField
                align="center"
                className={`${classes[levelError]} ${classes.inputHeader}`}
                fullWidth
                id="outlined-bare"
                margin="normal"
                name="level"
                onChange={this.onChange}
                placeholder="Add a level number here."
                value={this.state.level}
                variant="outlined"
              />
            )}
            no={() => null}
          />
        ),
        columns: [
          {
            Header: () => (
              <Typography className={classes.header}>Level</Typography>
            ),
            accessor: "level",
            Cell: row => (
              <Typography className={classes.level}>{row.value}</Typography>
            ),
            minWidth: 20
          }
        ]
      },
      {
        Header: () => (
          <Can
            roles={user.roles}
            perform="course:update-levels"
            id={user.username}
            matchingID={course.owner.username}
            yes={() => (
              <TextField
                className={`${classes[titleError]} ${classes.inputHeader}`}
                fullWidth
                id="outlined-bare"
                margin="normal"
                name="title"
                onChange={this.onChange}
                placeholder="And it's title here."
                value={this.state.title}
                variant="outlined"
              />
            )}
            no={() => null}
          />
        ),
        columns: [
          {
            Header: () => (
              <Typography className={classes.header}>Title</Typography>
            ),
            accessor: "title",
            Cell: props => (
              <Typography className={classes.title}>{props.value}</Typography>
            )
          }
        ]
      },
      {
        Header: row => (
          <div className={classes.addButton}>
            <Mutation
              mutation={levelCreate}
              update={(cache, {data: {levelCreate}}) => {
                try {
                  var gotLevels = cache.readQuery({
                    query: getLevels,
                    variables: {courseId: this.props.course.id}
                  })
                  var {levels} = gotLevels.getLevels
                  cache.writeQuery({
                    query: getLevels,
                    variables: {
                      courseId: this.props.course.id
                    },
                    data: {
                      getLevels: {
                        levels: levels.concat([levelCreate.level])
                      }
                    }
                  })
                } catch (err) {
                  console.log("err: ", err)
                }
              }}>
              {(levelCreate, {loading, error, data}) => {
                return loading ? (
                  <CircularProgress />
                ) : (
                  <Can
                    roles={user.roles}
                    perform="course:update-levels"
                    id={user.username}
                    matchingID={course.owner.username}
                    yes={() => (
                      <Button
                        type="submit"
                        onClick={this.addLevel(levelCreate)}>
                        Add Level
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
                perform="course:update-levels"
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
                perform="course:update-levels"
                id={user.username}
                matchingID={course.owner.username}
                yes={() => (
                  <LevelDeleteModal
                    row={row}
                    {...this.state}
                    closeDeleteModal={this.closeDeleteModal}
                    handleDelete={this.handleDelete}
                  />
                )}
                no={() => null}
              />
            ),
            minWidth: 20
          }
        ],
        minWidth: 30
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

          if (
            data &&
            !isEmpty(data) &&
            !isEmpty(data.getLevels.levels) &&
            typeof data.getLevels !== "undefined"
          ) {
            const level = data.getLevels.levels
          }

          return (
            <Grid container direction="column">
              <Hero title="Levels" />
              <List>{formErrors}</List>
              <Grid item>
                <ReactTable
                  getTheadThProps={() => {
                    return {style: {outline: 0}}
                  }}
                  className="-striped -highlight"
                  data={data.getLevels.levels}
                  columns={columns}
                  defaultPageSize={10}
                />
              </Grid>
              <Grid item style={{display: "flex", justifyContent: "center"}}>
                {/*  <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  type="submit"
                  onClick={this.onButtonClick}
                  size="large">
                  Save
                </Button> */}
              </Grid>
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
  var levels = levelObj

  return {
    user,
    course,
    levels
  }
}

export default connect(
  mapStateToProps,
  {toggleFooter}
)(withStyles(styles)(Levels))
