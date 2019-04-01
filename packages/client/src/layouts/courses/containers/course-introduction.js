import React, {useState} from "react"
import Helmet from "react-helmet"
import {courseSchema} from "@utterzone/common"

/* /1* import Button from "@material-ui/core/Button" *1/ */
import CircularProgress from "@material-ui/core/CircularProgress"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import {withStyles} from "@material-ui/core/styles"
import isEmpty from "lodash/isEmpty"

import classNames from "classnames"
import TextField from "@material-ui/core/TextField"
import {session} from "brownies"
import gql from "graphql-tag"
import {compose, Query, withApollo} from "react-apollo"
import {Can, Img, LoadingButton} from "../../../components"
/* import {LoadingButton} from "../../../components" */
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
/* const SUBSCRIBE_MUTATION = gql` */
/*   mutation subscribe($courseId: String!) { */
/*     subscribe(courseId: $courseId) { */
/*       _id */
/*       title */
/*     } */
/*   } */
/* ` */
/* const UNSUBSCRIBE_MUTATION = gql` */
/*   mutation unsubscribe($courseId: String!) { */
/*     unsubscribe(courseId: $courseId) */
/*   } */
/* ` */
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

const CourseIntroduction = props => {
  /* const [subscribed, setSubscribed] = useState(false) */
  const [disabled, setDisabled] = useState(true)
  console.log("setDisabled: ", setDisabled)
  const [input, handleChange] = useState({
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
    courseDescription: ""
  })

  /* const {user, course} = session */
  const {user} = session
  const {course} = session
  const {classes} = props

  /* var state = {} */

  /* componentDidMount() { */
  /*   const initialState = update(state, { */
  /*     courseId: {$set: course._id}, */
  /*     title: {$set: course.title}, */
  /*     courseDescription: {$set: course.courseDescription} */
  /*   }) */
  /*   state = {...state, ...initialState} */

  const found =
    session.user &&
    session.user.subscriptions.find(o => o._id === session.course._id)
  if (found) {
    /* setSubscribed(true) */
  }

  /* if (user && user.username === course.owner.username) { */
  /*   setDisabled(false) */
  /* } */

  /* const sessionSubscribe = () => { */
  /*   const {course, user} = session */
  /*   const tempUser = user */
  /*   tempUser.subscriptions.push({_id: course._id, title: course.title}) */
  /*   session.user = tempUser */
  /* } */

  const handleSubmit = async e => {
    e.preventDefault()
    // TODO: set loading
    handleChange({
      ...input,
      loading: true
    })
    // reset errors
    /* const resetErrors = handleChange({ */
    /*   ...input, */
    /*   formErrors: { */
    /*     errors: [] */
    /*   } */
    /* }) */

    try {
      await courseSchema.validate(input).catch(err => {
        if (err) {
          handleChange({
            ...input,
            formErrors: err
          })
          // mutate if no errors
          if (isEmpty(input.formErrors.errors)) {
            const updatedCourse = props.client.mutate({
              mutation: COURSE_UPDATE,
              variables: {
                _id: input.courseId,
                title: input.title,
                courseDescription: input.courseDescription
              }
            })
            if (updatedCourse) {
              session.course = updatedCourse.data.courseUpdate
            }

            handleChange({
              loading: false
            })
          }
        }
      })
    } catch (err) {
      throw err
    }
  }

  /* const sessionUnsubscribe = () => { */
  /*   const {user} = session */
  /*   const updatedSubscriptions = user.subscriptions.filter(obj => { */
  /*     return obj._id !== session.course._id */
  /*   }) */
  /*   user.subscriptions = updatedSubscriptions */
  /*   session.user = user */
  /* } */

  const courseDescriptionError = classNames({
    errorClass:
      input.formErrors.path === "courseDescription" &&
      !isEmpty(input.formErrors.errors)
  })

  const titleError = classNames({
    errorClass:
      input.formErrors.path === "title" && !isEmpty(input.formErrors.errors)
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
          <form onSubmit={handleSubmit}>
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
            <div className={classes.heroUnit}>
              <div className={classes.heroContent}>
                <Grid container justify="center" direction="column">
                  <Typography variant="h4" align="center" gutterBottom>
                    Introduction
                  </Typography>
                </Grid>
              </div>
            </div>
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

                  <div style={{display: "flex", justifyContent: "center"}}>
                    <Img margin="40px" src={course.courseImage} />
                  </div>
                </Grid>
                <Grid item xs={12} align="center">
                  {/*  <Mutation
                      mutation={SUBSCRIBE_MUTATION}
                      onCompleted={sessionSubscribe}>
                      {(SUBSCRIBE_MUTATION, {loading}) => {
                        return {
                          <LoadingButton
                            loading={loading}
                            disabled={loading}
                            color={
                              subscribed === true ? "secondary" : "primary"
                            }
                            variant="contained"
                            onClick={() => {
                              if (subscribed) {
                                client.mutate({
                                  mutation: UNSUBSCRIBE_MUTATION,
                                  variables: {
                                    courseId: course._id
                                  }
                                })
                                setSubscribed(false)
                                sessionUnsubscribe()
                              }
                              if (!subscribed) {
                                SUBSCRIBE_MUTATION({
                                  variables: {
                                    courseId: course._id
                                  }
                                })
                                setSubscribed(true)
                              }
                            }}
                            size="large">
                            <Typography>
                              {subscribed ? "unsubscribe" : "subscribe"}
                            </Typography>
                          </LoadingButton>
                        }
                      }}
                    </Mutation> */}
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" align="left" gutterBottom>
                    General Information
                  </Typography>
                  <TextField
                    className={`${classes[titleError]} ${classes.inputHeader}`}
                    fullWidth
                    disabled={disabled}
                    label="Course Title"
                    margin="normal"
                    name="title"
                    onChange={e =>
                      handleChange({...input, title: e.target.value})
                    }
                    placeholder="And it's title here."
                    type="text"
                    variant="outlined"
                    value={course.title}
                  />
                  {input.formErrors.path === "title" && (
                    <div style={{color: "#f44336"}}>
                      {input.formErrors.errors[0]}
                    </div>
                  )}

                  <TextField
                    className={`${classes[courseDescriptionError]} ${
                      classes.inputHeader
                    }`}
                    disabled={disabled}
                    fullWidth
                    name="courseDescription"
                    label="Course Description"
                    type="text"
                    onChange={e =>
                      handleChange({
                        ...input,
                        courseDescription: e.target.value
                      })
                    }
                    margin="normal"
                    multiline
                    variant="outlined"
                    rowsMax="4"
                    value={course.courseDescription}
                  />
                  {input.formErrors.path === "courseDescription" && (
                    <div style={{color: "#f44336"}}>
                      {input.formErrors.errors[0]}
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
                        <LoadingButton
                          variant="contained"
                          loading={loading}
                          disabled={loading}
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

export default compose(
  withApollo,
  withStyles(styles)
)(CourseIntroduction)
