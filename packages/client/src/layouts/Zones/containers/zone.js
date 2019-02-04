import React, {Component} from "react"
import {connect} from "react-redux"
import /* Switch, */
/* Route */
/* Link, */
"react-router-dom"
/* import Select from "react-select" */

import {withStyles} from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"

import {cloneDeep} from "lodash"
import {Helmet} from "react-helmet"

import AppsContainer from "../../../apps/apps-container"
/* import {Section} from "../../../components" */
import {Chat} from "../../../containers"
import "react-select/dist/react-select.css" // comment out exclude node_modules for css-loader
/* import "./styles.css" */

// actions
import {toggleFooter} from "../../../core/actions/toggle-footer-action.js"

/* const getCourse = gql` */
/*   query getCourse($courseId: String) { */
/*     getCourse(courseId: $courseId) { */
/*       course { */
/*         id */
/*         courseImage */
/*         courseName */
/*         courseMode */
/*         owner { */
/*           username */
/*         } */
/*       } */
/*     } */
/*   } */

/* ` */

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  }
})

const initialCoursesdivState = {
  courseRef: ""
}

class Zone extends Component {
  locationName = this.props.path

  constructor(props) {
    super(props)

    this.state = cloneDeep(initialCoursesdivState)
  }

  componentDidMount() {
    this.props.toggleFooter(false)
  }

  componentWillUnmount() {
    this.props.toggleFooter(true)
  }

  handleImageClick = e => {
    e.preventDefault()
    // TODO
  }

  render() {
    const {classes} = this.props
    return (
      <React.Fragment>
        <Helmet>
          <meta charset="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <meta
            name="description"
            content="Edit your course.  Add material that you are using from another learning resource and make it your own.  Create a strategy that think makes the most sense and is pedagogically sound."
          />
          <meta name="author" content="Isaac Pak" />
          <title>Utterzone | Course Edit</title>
          <link rel="canonical" href="https://utter.zone/course/:id" />
        </Helmet>

        <Grid container spacing={24} className={classes.root}>
          <Grid item xs={8}>
            <AppsContainer />
          </Grid>
          <Grid item xs={4}>
            <div style={{background: "LightGray"}}>
              <Chat />
            </div>
          </Grid>
        </Grid>
      </React.Fragment>
    )
  }
}

export default connect(
  null,
  {toggleFooter}
)(withStyles(styles)(Zone))
