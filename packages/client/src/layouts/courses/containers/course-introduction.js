import React, {PureComponent} from "react"
import {Helmet} from "react-helmet-async"
import {courseSchema} from "@utterzone/common"
import {toast} from "react-toastify"

/* /1* import Button from "@material-ui/core/Button" *1/ */
import CircularProgress from "@material-ui/core/CircularProgress"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import {withStyles} from "@material-ui/core/styles"
import isEmpty from "lodash/isEmpty"

import classNames from "classnames"
import TextField from "@material-ui/core/TextField"
import {session} from "brownies"
import {compose, Mutation, Query, withApollo} from "react-apollo"
import {Can, Img, LoadingButton} from "../../../components"
import {
  GET_COURSE,
  GET_COURSES
} from "../../../graphql/queries/course-queries.js"
import {
  COURSE_UPDATE,
  SUBSCRIBE_MUTATION,
  UNSUBSCRIBE_MUTATION
} from "../../../graphql/mutations/course-mutations.js"
import {styles} from "../styles.js"

class CourseIntroduction extends PureComponent {
  state = {
    formErrors: {
      errors: []
    },
    courseId: session.course._id,
    courseDescription: session.course.courseDescription,
    name: "",
    email: "",
    loading: false,
    subscribed: false,
    submittedName: "",
    submittedEmail: "",
    title: session.course.title
  }

  courseDescriptionError = classNames({
    errorClass:
      this.state.formErrors.path === "courseDescription" &&
      !isEmpty(this.state.formErrors.errors)
  })

  titleError = classNames({
    errorClass:
      this.state.formErrors.path === "title" &&
      !isEmpty(this.state.formErrors.errors)
  })

  sessionUnsubscribe = () => {
    const {user} = session
    const updatedSubscriptions = user.subscriptions.filter(obj => {
      return obj._id !== session.course._id
    })
    user.subscriptions = updatedSubscriptions
    session.user = user
  }

  handleSubmit = async e => {
    e.preventDefault()

    // reset errors
    /* const resetErrors = this.setState({ */
    /*   formErrors: { */
    /*     errors: [] */
    /*   } */
    /* }) */

    const yupCheck = await courseSchema.validate(this.state).catch(err => {
      if (err) {
        console.log("err: ", err)
        this.setState({
          formErrors: {
            errors: err
          }
        })
        return err
      }
    })
    if (isEmpty(yupCheck.errors)) {
      this.setState({
        loading: true
      })
      const updatedCourse = await this.props.client.mutate({
        mutation: COURSE_UPDATE,
        variables: {
          _id: this.state.courseId,
          title: this.state.title,
          courseDescription: this.state.courseDescription
        },
        refetchQueries: [
          {query: GET_COURSES, variables: {usingLang: "", teachingLang: ""}}
        ]
      })
      if (updatedCourse) {
        session.course = updatedCourse.data.courseUpdate
        // TODO:  toastify & make loading button work on save
        toast.success("Your changes were saved.", {
          className: "toasty",
          bodyClassName: "toasty-body",
          hideProgressBar: true
        })
      }

      this.setState({
        formErrors: {
          errors: ["hi"]
        },
        loading: false
      })
    }
  }

  sessionSubscribe = () => {
    const {course, user} = session
    const tempUser = user
    tempUser.subscriptions.push({_id: course._id, title: course.title})
    session.user = tempUser
  }

  componentDidMount = () => {
    const {courseId} = this.props.location.state || ""
    var found = new Promise(resolve => {
      if (session.user.subscriptions) {
        var result = session.user.subscriptions.find(o => {
          return o._id === courseId
        })
      }
      resolve(result)
    })

    found.then(res => {
      let bool = false
      if (res) bool = true
      this.setState({
        subscribed: bool
      })
    })
  }

  render() {
    const {classes, client} = this.props
    const {user, course} = session
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
                    Course Introduction
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
                    }}>
                    {/*  
									TODO: Change thumbnail feature
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
                  /> */}

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
                                    courseId: course._id,
                                    userId: session.user._id
                                  }
                                })
                                this.setState({
                                  subscribed: false
                                })
                                this.sessionUnsubscribe()
                              }
                              if (!this.state.subscribed) {
                                SUBSCRIBE_MUTATION({
                                  variables: {
                                    courseId: course._id,
                                    userId: session.user._id
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
                      className={`${classes[this.titleError]} ${
                        classes.inputHeader
                      }`}
                      fullWidth
                      disabled={this.state.loading}
                      label="Course Title"
                      margin="normal"
                      name="title"
                      onChange={e =>
                        this.setState({
                          title: e.target.value
                        })
                      }
                      placeholder="And it's title here."
                      type="text"
                      variant="outlined"
                      value={this.state.title}
                    />
                    {this.state.formErrors.path === "title" && (
                      <div style={{color: "#f44336"}}>
                        {this.state.formErrors.errors[0]}
                      </div>
                    )}

                    <TextField
                      className={`${classes[this.courseDescriptionError]} ${
                        classes.inputHeader
                      }`}
                      disabled={this.state.loading}
                      fullWidth
                      name="courseDescription"
                      label="Course Description"
                      type="text"
                      onChange={e =>
                        this.setState({
                          courseDescription: e.target.value
                        })
                      }
                      margin="normal"
                      multiline
                      variant="outlined"
                      rowsMax="12"
                      value={this.state.courseDescription}
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
                      roles={user && user.roles}
                      perform="course:update-introduction"
                      id={user && user.username}
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
