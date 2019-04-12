import React, {Component} from "react"
import {Helmet} from "react-helmet-async"
/* import {Can} from "../../../components" */
import {CourseModal} from "../../../containers"

import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import {withStyles} from "@material-ui/core/styles"

import {session} from "brownies"
import {graphql} from "react-apollo"
import gql from "graphql-tag"

const COURSE_UPDATE = gql`
  mutation courseUpdate($input: CourseUpdated!) {
    courseUpdate(input: $input) {
      id
      courseMode
    }
  }
`

const styles = theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  courseMode: {
    fontSize: theme.spacing.unit * 3,
    marginRight: "20px",
    paddingLeft: "20px",
    color: "orange"
  },
  dangerZone: {
    color: "red",
    padding: "16px"
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
    margin: "0 auto",
    width: "100%"
  }
})

class CourseSettings extends Component {
  state = {
    name: "",
    email: "",
    open: false,
    submittedName: "",
    submittedEmail: ""
  }

  handleChange = (e, {name, value}) => this.setState({[name]: value})

  handlePublish = async () => {
    // publish updates course mode to live
    const result = await this.props.mutate({
      input: "live"
    })
    console.log("result: ", result)
  }

  handleDeleteModalOpen = () => {
    this.setState({
      open: true
    })
  }

  handleDeleteModalClose = () => {
    this.setState({open: false})
  }

  handleSubmit = () => {
    const {name, email} = this.state

    this.setState({submittedName: name, submittedEmail: email})
  }

  render() {
    /* const {name, email, submittedName, submittedEmail} = this.state */
    const {classes} = this.props
    const {course} = session
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
          <title>Utterzone | Settings</title>
          <link rel="canonical" href="https://utter.zone/settings" />
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
              Course Settings
            </Typography>
          </Paper>
        </Grid>
        <main className={classes.content}>
          <Grid container spacing={24}>
            {/* TODO: Course mode feature
                <Grid item xs={12}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      margin: "100px 0"
                    }}>
                    <Typography variant="h5" align="left" noWrap>
                      Course Mode:
                    </Typography>
                    <Typography align="center" className={classes.courseMode}>
                      {course.courseMode}
                    </Typography>
                    <Button
                      variant="outlined"
                      style={{
                        backgroundColor: "orange",
                        color: "white"
                      }}
                      onClick={this.handlePublish}>
                      {course.courseMode === "draft" ? "edit" : "publish"}
                    </Button>
                  </div>
                </Grid>
								*/}
            <Grid item xs={12} style={{backgroundColor: "#3e3e3e"}}>
              <Typography
                variant="h6"
                align="left"
                className={classes.dangerZone}
                gutterBottom>
                Danger Zone
              </Typography>
              <Button
                variant="outlined"
                onClick={this.handleDeleteModalOpen}
                style={{
                  backgroundColor: "red",
                  color: "white",
                  margin: "12px"
                }}>
                Delete Course
              </Button>
              <CourseModal
                course={course}
                open={this.state.open}
                onClose={this.handleDeleteModalClose}
              />
            </Grid>
            <Grid item xs={12}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  margin: "50px 0"
                }}
              />
            </Grid>
          </Grid>
        </main>
      </form>
    )
  }
}

const withGraphql = graphql(COURSE_UPDATE)(CourseSettings)

export default withStyles(styles)(withGraphql)
