import React, {Component} from "react"
import {connect} from "react-redux"
import Helmet from "react-helmet"
import {withFormik} from "formik"
import {courseSchema} from "@utterzone/common"
import update from "immutability-helper"
import schema from "../../../core/schema.js"
import {history} from "@utterzone/connector"

import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import {withStyles} from "@material-ui/core/styles"

import {Can, Img} from "../../../components"

// actions
import {toggleFooter} from "../../../core/actions/toggle-footer-action.js"

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

class CourseIntroduction extends Component {
  state = {
    name: "",
    email: "",
    submittedName: "",
    submittedEmail: "",
    courseName: "",
    courseDescription: "",
    disabled: true
  }

  componentDidMount() {
    this.props.toggleFooter(false)
    const newData = update(this.state, {
      courseName: {$set: this.props.course.courseName},
      courseDescription: {$set: this.props.course.courseDescription}
    })

    this.setState(newData)

    if (this.props.user.username === this.props.course.owner.username) {
      this.setState({
        disabled: false
      })
    }
  }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = () => {
    const {name, email} = this.state

    this.setState({submittedName: name, submittedEmail: email})
  }

  openModalClicked = e => {
    e.preventDefault()
  }

  render() {
    const {classes, course, user} = this.props
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
              <Typography
                variant="h4"
                align="center"
                className={classes.text}
                gutterBottom>
                Course Introduction
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
                  <Typography
                    variant="h4"
                    align="left"
                    className={classes.text}
                    gutterBottom>
                    Course Thumbnail
                  </Typography>

                  <div style={{display: "flex", justifyContent: "center"}}>
                    <Img margin="40px" src={course.courseImage} />
                  </div>
                </Grid>
              )}
              no={() => null}
            />
            <Grid item xs={12}>
              <Typography
                variant="h4"
                align="left"
                className={classes.text}
                gutterBottom>
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
                value={this.state.courseName}
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
                value={this.state.courseDescription}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="h4"
                align="left"
                className={classes.text}
                gutterBottom>
                Meta
              </Typography>
              <div>
                Course Author:{" "}
                <em style={{fontWeight: 900}}>{course.owner.username}</em>
              </div>
            </Grid>
            <Grid container style={{margin: "50px auto"}}>
              <Can
                roles={user.roles}
                perform="course:update-introduction"
                id={user.username}
                matchingID={course.owner.username}
                yes={() => (
                  <Grid item xs={6}>
                    <Button type="submit" color="inherit" variant="outlined">
                      Save Changes
                    </Button>
                  </Grid>
                )}
                no={() => null}
              />
              <Grid item xs={6}>
                <Button color="inherit">Subscribe</Button>
              </Grid>
            </Grid>
          </Grid>
        </main>
      </form>
    )
  }
}

const mapStateToProps = state => {
  const session = schema.session(state.apiReducer)
  const {User, Course} = session
  const userObj = User.all().toRefArray()
  const courseObj = Course.all().toRefArray()
  var user = userObj[0]
  var course = courseObj[0]

  return {
    user,
    course
  }
}

const actions = {
  toggleFooter
}

export default connect(
  mapStateToProps,
  actions
)(
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
  })(withStyles(styles)(CourseIntroduction))
)
