import React, {Component} from "react"
import {connect} from "react-redux"
import {Redirect} from "react-router-dom"

import {withStyles} from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"

import {cloneDeep} from "lodash"
import {Helmet} from "react-helmet"
import socket from "../../../services/socketio"

import AppsContainer from "../../../apps/apps-container"
import schema from "../../../core/schema.js"
import Chat from "./chat/index.js"
import "react-select/dist/react-select.css" // comment out exclude node_modules for css-loader

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

const Loader = () => <div>Loading...</div>

const initialState = {
  courseRef: "",
  user: {name: "beef"},
  isRegisterInProcess: false,
  chatrooms: null,
  client: socket()
}

class Zone extends Component {
  locationName = this.props.path

  state = cloneDeep(initialState)

  componentDidMount() {
    this.props.toggleFooter(false)
  }

  onLeaveZone = (chatroomName, onLeaveSuccess) => {
    this.state.client.leave(chatroomName, err => {
      if (err) return console.error(err)
      return onLeaveSuccess()
    })
  }

  getZones = () => {
    this.state.client.getZones((err, chatrooms) => {
      this.setState({chatrooms})
    })
  }

  register = name => {
    const onRegisterResponse = user =>
      this.setState({isRegisterInProcess: false, user})
    this.setState({isRegisterInProcess: true})
    this.state.client.register(name, (err, user) => {
      if (err) return onRegisterResponse(null)
      return onRegisterResponse(user)
    })
  }

  renderUserSelectionOrRedirect = renderUserSelection => {
    if (this.state.user) {
      return <Redirect to="/" />
    }

    return this.state.isRegisterInProcess ? <Loader /> : renderUserSelection()
  }

  render() {
    const {zoneId} = this.props.zone
		console.log('zoneid: ', zoneId);
    var chatHistory = [{user: "franz", message: "hello there", event: null}]
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
          <Grid item xs={12} sm={12} md={8} lg={9}>
            <AppsContainer />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={3}>
            <div style={{background: "LightGray"}}>
              <Chat
                chatHistory={chatHistory}
                user={this.state.user}
                onLeave={() =>
                  this.onLeaveZone(zoneId, () => history.push("/zones"))
                }
                onSendMessage={(message, cb) =>
                  this.state.client.message(zoneId, message, cb)
                }
                registerHandler={this.state.client.registerHandler}
                unregisterHandler={this.state.client.unregisterHandler}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={9}>
            <h1>Control Panel</h1>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={3}>
            <div style={{background: "LightGray"}}>
              <h1>Secondary</h1>
            </div>
          </Grid>
        </Grid>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  const session = schema.session(state.apiReducer)
  const {Zone} = session
  const zoneObj = Zone.all().toRefArray()
  var zone = zoneObj[0]

  return {
    zone
  }
}

export default connect(
  mapStateToProps,
  {toggleFooter}
)(withStyles(styles)(Zone))
