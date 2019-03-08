import React, {Component} from "react"
import {connect} from "react-redux"
import Helmet from "react-helmet"
import {withFormik} from "formik"
import {courseSchema} from "@utterzone/common"
import update from "immutability-helper"
import {history} from "@utterzone/connector"

import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import {withStyles} from "@material-ui/core/styles"

import {session} from "brownies"
import gql from "graphql-tag"
import {graphql, Mutation, withApollo} from "react-apollo"
import {Can, Img, LoadingButton} from "../../../components"

// actions
import {toggleFooter} from "../../../core/actions/toggle-footer-action.js"

const subscribeMutation = gql`
  mutation subscribe($courseId: String!) {
    subscribe(courseId: $courseId) {
      _id
    }
  }
`
const UNSUBSCRIBE_MUTATION = gql`
  mutation unsubscribe($courseId: String!) {
    unsubscribe(courseId: $courseId)
  }
`
/* const getCourse = gql` */
/*   query getCourse($courseId: String!) { */
/*     getCourse(courseId: $courseId) { */
/*       courseName */
/*       levels { */
/*         id */
/*         title */
/*       } */
/*     } */
/*   } */
/* ` */

const styles = theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper
  },
  heroContent: {
    maxWidth: 600,
    margin: "0 auto",
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4
  },
  root: {
    maxWidth: 900,
    margin: "0 auto"
  }
})

const {course, user} = session
const map = new Map(user.subscriptions.map(el => [el._id, el]))
const courseSet = map.get(course._id) || {}
console.log("courseSet: ", courseSet)

class CourseIntroduction extends Component {
  state = {
    name: "",
    email: "",
    submittedName: "",
    submittedEmail: "",
    courseName: "",
    courseDescription: "",
    disabled: true,
    subscribed: false
  }

  componentDidMount() {
    this.props.toggleFooter(false)

    if (courseSet._id) {
      const newState = update(this.state, {
        subscribed: {$set: true},
        courseName: {$set: course.courseName},
        courseDescription: {$set: course.courseDescription}
      })
      this.setState(newState, () => console.log("this state: ", this.state))
    }

    if (user.username === course.owner.username) {
      this.setState({
        disabled: false
      })
    }
  }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  sessionSubscribe = () => {
    const tempUser = user
    tempUser.subscriptions.push({_id: course._id})

    session.user = tempUser
  }

  handleSubmit = e => {
    e.preventDefault()
    const {name, email} = this.state

    this.setState({submittedName: name, submittedEmail: email})
  }

  sessionUnsubscribe = () => {
    const updatedSubscriptions = user.subscriptions.filter(obj => {
      return obj._id !== session.course._id
    })

    user.subscriptions = updatedSubscriptions

    session.user = user
  }

  render() {
    const {classes, client} = this.props
    const {course, user} = session

    return (
      <form className={classes.root} onSubmit={this.handleSubmit}>
        <Helmet>
          <meta charset="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <meta name="description" content="Affordable language learning" />
          <meta name="author" content="Isaac Pak" />
          <title>Utterzone | Course Introduction</title>
          <link
            rel="canonical"
            href="https://utter.zone/course/course-introduction"
          />
        </Helmet>
        {/* Hero unit */}
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
            <Can
              roles={user.roles}
              perform="course:update-introduction"
              id={user.username}
              matchingID={course.owner.username}
              yes={() => (
                <Grid item xs={12}>
                  <Typography variant="h6" align="center" gutterBottom>
                    Course Thumbnail
                  </Typography>

                  <div style={{display: "flex", justifyContent: "center"}}>
                    <Img margin="40px" src={course.courseImage} />
                  </div>
                </Grid>
              )}
              no={() => null}
            />
            <Grid item xs={12} align="center">
              <Mutation
                mutation={subscribeMutation}
                onCompleted={this.sessionSubscribe}>
                {(subscribeMutation, {loading}) => {
                  return (
                    <LoadingButton
                      loading={loading}
                      disabled={loading}
                      color={
                        this.state.subscribed === true ? "secondary" : "primary"
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
                          subscribeMutation({
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
                        {this.state.subscribed ? "unsubscribe" : "subscribe"}
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
                fullWidth
                id="outlined-search"
                name="courseName"
                label="Course Name"
                onChange={this.handleChange}
                type="text"
                className={classes.searchField}
                margin="normal"
                variant="outlined"
                disabled={this.state.disabled}
                value={course.courseName}
              />
              <TextField
                fullWidth
                id="outlined-search"
                name="courseDescription"
                label="Course Description"
                multiline
                rows={6}
                rowsMax={10}
                onChange={this.handleChange}
                type="text"
                className={classes.searchField}
                margin="normal"
                variant="outlined"
                disabled={this.state.disabled}
                value={course.courseDescription}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" align="left" gutterBottom>
                Meta
              </Typography>
              <Typography variant="body1" align="left" gutterBottom>
                Course Author:{" "}
                <span style={{fontWeight: 900}}>{course.owner.username}</span>
              </Typography>
              <Typography variant="body1" align="left" gutterBottom>
                Resources: <span style={{fontWeight: 900}}>pending</span>
              </Typography>
              <Typography variant="body1" align="left" gutterBottom>
                Using Language:{" "}
                <span style={{fontWeight: 900}}>{course.usingLang}</span>
              </Typography>
              <Typography variant="body1" align="left" gutterBottom>
                Teaching Language:{" "}
                <span style={{fontWeight: 900}}>{course.teachingLang}</span>
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
                    <Button type="submit" color="inherit" variant="outlined">
                      Save Changes
                    </Button>
                  </Grid>
                )}
                no={() => null}
              />
            </Grid>
          </Grid>
        </main>
      </form>
    )
  }
}

const actions = {
  toggleFooter
}

export default connect(
  null,
  actions
)(
  graphql(subscribeMutation)(
    withFormik({
      validationSchema: courseSchema,
      validateOnChange: false,
      validateOnBlur: false,
      mapPropsToValues: () => ({
        "username or email": "",
        password: ""
      }),
      handleSubmit: async (values, {props, setErrors}) => {
        const errors = await props.submit(values)
        if (errors) {
          if (errors.identifier) {
            errors["username or email"] = errors.identifier
          }
          setErrors(errors)
        }
        if (!errors) {
          history.push("/")
        }
      }
    })(withApollo(withStyles(styles)(CourseIntroduction)))
  )
)
