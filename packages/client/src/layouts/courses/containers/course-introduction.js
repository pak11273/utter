import React, {PureComponent} from "react"
import Helmet from "react-helmet"
import {courseSchema} from "@utterzone/common"
import update from "immutability-helper"

/* import Button from "@material-ui/core/Button" */
import CircularProgress from "@material-ui/core/CircularProgress"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import {withStyles} from "@material-ui/core/styles"
import isEmpty from "lodash/isEmpty"

import classNames from "classnames"
import TextField from "@material-ui/core/TextField"
import {session} from "brownies"
import gql from "graphql-tag"
import {compose, Query, Mutation, withApollo} from "react-apollo"
import {Can, Img, LoadingButton} from "../../../components"
import {styles} from "../styles.js"

const GET_COURSE = gql`
  query getCourse($_id: String!) {
    getCourse(_id: $_id) {
      _id
      title
      courseDescription
    }
  }
`
const SUBSCRIBE_MUTATION = gql`
  mutation subscribe($courseId: String!) {
    subscribe(courseId: $courseId) {
      _id
      title
    }
  }
`
const UNSUBSCRIBE_MUTATION = gql`
  mutation unsubscribe($courseId: String!) {
    unsubscribe(courseId: $courseId)
  }
`
const COURSE_UPDATE = gql`
  mutation courseUpdate($_id: ID, $title: String, $courseDescription: String) {
    courseUpdate(
      input: {_id: $_id, title: $title, courseDescription: $courseDescription}
    ) {
      courseDescription
      courseImage
      courseMode
      title
      _id
      levels {
        _id
        level
      }
      owner {
        _id
        username
      }
      resource
      subscribers
      teachingLang
      usingLang
    }
  }
`

const {user, course} = session

class CourseIntroduction extends PureComponent {
  state = {
    formErrors: {
      errors: []
    },
    courseId: "",
    name: "",
    email: "",
    loading: false,
    submittedName: "",
    submittedEmail: "",
    title: "",
    courseDescription: "",
    disabled: true,
    subscribed: false
  }

  componentDidMount() {
    const initialState = update(this.state, {
      courseId: {$set: course._id},
      title: {$set: course.title},
      courseDescription: {$set: course.courseDescription}
    })
    this.setState(initialState)

    const found =
      session.user &&
      session.user.subscriptions.find(o => o._id === session.course._id)
    if (found) {
      const newState = update(this.state, {
        subscribed: {$set: true}
      })
      this.setState(newState)
    }

    if (user && user.username === course.owner.username) {
      this.setState({
        disabled: false
      })
    }
  }

  handleChange = e => {
    e.persist()
    const {name} = e.target
    this.setState({[name]: e.target.value})
  }

  sessionSubscribe = () => {
    const {course, user} = session
    const tempUser = user
    tempUser.subscriptions.push({_id: course._id, title: course.title})

    session.user = tempUser
  }

  handleSubmit = async e => {
    e.preventDefault()
    // TODO: set loading
    await this.setState({
      loading: true
    })
    // reset errors
    const resetErrors = update(this.state, {
      formErrors: {
        errors: {$set: []}
      }
    })
    this.setState(resetErrors)
    try {
      await courseSchema.validate(this.state).catch(err => {
        if (err) {
          const newState = update(this.state, {
            formErrors: {$set: err}
          })
          this.setState(newState)
        }
      })
      // mutate if no errors
      if (isEmpty(this.state.formErrors.errors)) {
        const updatedCourse = await this.props.client.mutate({
          mutation: COURSE_UPDATE,
          variables: {
            _id: this.state.courseId,
            title: this.state.title,
            courseDescription: this.state.courseDescription
          }
        })
        if (updatedCourse) {
          session.course = updatedCourse.data.courseUpdate
        }
        await this.setState({
          loading: false
        })
      }
    } catch (err) {
      throw err
    }
  }

  sessionUnsubscribe = () => {
    const {user} = session
    const updatedSubscriptions = user.subscriptions.filter(obj => {
      return obj._id !== session.course._id
    })

    user.subscriptions = updatedSubscriptions

    session.user = user
  }

  render() {
    const {classes, client} = this.props
    const {course} = session

    const courseDescriptionError = classNames({
      errorClass:
        this.state.formErrors.path === "courseDescription" &&
        !isEmpty(this.state.formErrors.errors)
    })

    const titleError = classNames({
      errorClass:
        this.state.formErrors.path === "title" &&
        !isEmpty(this.state.formErrors.errors)
    })

    return (
      <Query
        query={GET_COURSE}
        variables={{
          _id: course._id
        }}>
        {({loading, error}) => {
          if (loading)
            return (
              <Grid
                container
                alignContent="center"
                justify="center"
                style={{height: "300px"}}>
                <CircularProgress style={{color: "grey"}} />
              </Grid>
            )
          if (error) {
            console.log("err: ", error)
            return (
              <Grid>
                <p>
                  {error.graphQLErrors.map(({message}, i) => (
                    <p
                      style={{
                        fontSize: "1.3em",
                        color: "red",
                        margin: "30px",
                        padding: "30px",
                        textAlign: "center"
                      }}
                      key={i}>
                      {message}
                    </p>
                  ))}
                </p>
              </Grid>
            )
          }
          return (
            <form onSubmit={this.handleSubmit}>
              <Helmet>
                <meta charset="utf-8" />
                <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
                <meta
                  name="description"
                  content="Affordable language learning"
                />
                <meta name="author" content="Isaac Pak" />
                <title>Utterzone | Course Introduction</title>
                <link
                  rel="canonical"
                  href="https://utter.zone/course/course-introduction"
                />
              </Helmet>
              {/*   Hero unit  */}
              <div className={classes.heroUnit}>
                <div className={classes.heroContent}>
                  <Grid container justify="center" direction="column">
                    <Typography variant="h4" align="center" gutterBottom>
                      Introduction
                    </Typography>
                  </Grid>
                </div>
              </div>
              {/* End hero unit */}
              <main className={classes.content}>
                <Grid container spacing={24}>
                  <Grid
                    item
                    xs={12}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center"
                    }}>
                    {/*
                    <Can
                      roles={user.roles}
                      perform="course:update-introduction"
                      id={user.username}
                      matchingID={course.owner.username}
                      yes={() => (
                        <LoadingButton
                          style={{display: "flex", width: "120px"}}
                          variant="contained">
                          <Typography>Change Thumbnail</Typography>
                        </LoadingButton>
                      )}
                      no={() => (
                        <Typography variant="h6" align="center" gutterBottom>
                          Course Thumbnail
                        </Typography>
                      )}
                    />
										*/}

                    <div style={{display: "flex", justifyContent: "center"}}>
                      <Img margin="40px" src={course.courseImage} />
                    </div>
                  </Grid>
                  <Grid item xs={12} align="center">
                    <Mutation
                      mutation={SUBSCRIBE_MUTATION}
                      onCompleted={this.sessionSubscribe}>
                      {(SUBSCRIBE_MUTATION, {loading}) => {
                        return (
                          <LoadingButton
                            loading={loading}
                            disabled={loading}
                            color={
                              this.state.subscribed === true
                                ? "secondary"
                                : "primary"
                            }
                            variant="contained"
                            onClick={() => {
                              if (this.state.subscribed) {
                                client.mutate({
                                  mutation: UNSUBSCRIBE_MUTATION,
                                  variables: {
                                    courseId: course._id
                                  }
                                })
                                this.setState(
                                  {
                                    subscribed: false
                                  },
                                  () => this.sessionUnsubscribe()
                                )
                              }
                              if (!this.state.subscribed) {
                                SUBSCRIBE_MUTATION({
                                  variables: {
                                    courseId: course._id
                                  }
                                })
                                this.setState({
                                  subscribed: true
                                })
                              }
                            }}
                            size="large">
                            <Typography>
                              {this.state.subscribed
                                ? "unsubscribe"
                                : "subscribe"}
                            </Typography>
                          </LoadingButton>
                        )
                      }}
                    </Mutation>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6" align="left" gutterBottom>
                      General Information
                    </Typography>
                    <TextField
                      className={`${classes[titleError]} ${
                        classes.inputHeader
                      }`}
                      fullWidth
                      disabled={this.state.disabled}
                      label="Course Title"
                      margin="normal"
                      name="title"
                      onChange={this.handleChange}
                      placeholder="And it's title here."
                      type="text"
                      variant="outlined"
                      value={course.title}
                    />
                    {this.state.formErrors.path === "title" && (
                      <div style={{color: "#f44336"}}>
                        {this.state.formErrors.errors[0]}
                      </div>
                    )}

                    <TextField
                      className={`${classes[courseDescriptionError]} ${
                        classes.inputHeader
                      }`}
                      disabled={this.state.disabled}
                      fullWidth
                      name="courseDescription"
                      label="Course Description"
                      type="text"
                      onChange={this.handleChange}
                      margin="normal"
                      multiline
                      variant="outlined"
                      rowsMax="4"
                      value={course.courseDescription}
                    />
                    {this.state.formErrors.path === "courseDescription" && (
                      <div style={{color: "#f44336"}}>
                        {this.state.formErrors.errors[0]}
                      </div>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6" align="left" gutterBottom>
                      Course Details
                    </Typography>
                    <Typography variant="body1" align="left" gutterBottom>
                      Course Author:{" "}
                      <span style={{fontWeight: 900}}>
                        {course.owner.username}
                      </span>
                    </Typography>
                    <Typography variant="body1" align="left" gutterBottom>
                      Resource:{" "}
                      <span style={{fontWeight: 900}}>
                        {course.resource || "none"}
                      </span>
                    </Typography>
                    <Typography variant="body1" align="left" gutterBottom>
                      Using Language:{" "}
                      <span style={{fontWeight: 900}}>{course.usingLang}</span>
                    </Typography>
                    <Typography variant="body1" align="left" gutterBottom>
                      Teaching Language:{" "}
                      <span style={{fontWeight: 900}}>
                        {course.teachingLang}
                      </span>
                    </Typography>
                  </Grid>
                  <Grid container style={{margin: "50px auto"}}>
                    <Can
                      roles={user.roles}
                      perform="course:update-introduction"
                      id={user.username}
                      matchingID={course.owner.username}
                      yes={() => (
                        <Grid item xs={12} align="center">
                          <LoadingButton
                            variant="contained"
                            loading={this.state.loading}
                            disabled={this.state.loading}
                            type="submit"
                            color="secondary">
                            Save Changes
                          </LoadingButton>
                        </Grid>
                      )}
                      no={() => null}
                    />
                  </Grid>
                </Grid>
              </main>
            </form>
          )
        }}
      </Query>
    )
  }
}

export default compose(
  withApollo,
  withStyles(styles)
)(CourseIntroduction)
