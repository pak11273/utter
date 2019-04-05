import React, {Component} from "react"
import ReactTable from "react-table"
import update from "immutability-helper"
import "react-table/react-table.css"

import Button from "@material-ui/core/Button"
import CircularProgress from "@material-ui/core/CircularProgress"
import Grid from "@material-ui/core/Grid"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import {withStyles} from "@material-ui/core/styles"

/* components */
/* import {LevelDeleteModal} from "../components" */
import {Can, Hero, LoaderCircle} from "../../../components"

import {session} from "brownies"
import {Mutation, Query} from "react-apollo"
import classNames from "classnames"
import isEmpty from "lodash/isEmpty"

import {levelSchema} from "@utterzone/common"
import {styles} from "../styles.js"

import {getLevels, levelCreate} from "../xhr.js"

class Levels extends Component {
  constructor(props) {
    super(props)

    this.state = {
      courseId: "",
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
    const {course} = session
    this.setState({
      courseId: course._id
    })
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
    const {course, user} = session

    const {classes} = this.props
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
            minWidth: 60,
            maxWidth: 80
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
        Header: () => (
          <div className={classes.addButton}>
            <Mutation
              mutation={levelCreate}
              update={(cache, {data: {levelCreate}}) => {
                try {
                  var gotLevels = cache.readQuery({
                    query: getLevels,
                    variables: {courseId: course._id}
                  })
                  var {levels} = gotLevels.getLevels
                  cache.writeQuery({
                    query: getLevels,
                    variables: {
                      courseId: course._id
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
              {(levelCreate, {loading}) => {
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
            Cell: () => (
              <Can
                roles={user.roles}
                perform="course:update-levels"
                id={user.username}
                matchingID={course.owner.username}
                yes={() => (
                  <div>delete</div>
                  /*  <LevelDeleteModal
                    row={row}
                    {...this.state}
                    closeDeleteModal={this.closeDeleteModal}
                    handleDelete={this.handleDelete}
                  /> */
                )}
                no={() => null}
              />
            ),
            minWidth: 90,
            maxWidth: 100
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
          courseId: course._id
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

          /* if (!isEmpty(data.getLevels.levels)) { */
          /*   console.log("data: ", data.getLevels.levels) */
          /* } */

          return (
            <Grid container direction="column">
              <Hero title="Levels" />
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
                  data={data.getLevels.levels}
                  columns={columns}
                  defaultPageSize={10}
                />
              </Grid>
            </Grid>
          )
        }}
      </Query>
    )
  }
}

export default withStyles(styles)(Levels)
