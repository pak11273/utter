import React, {Component} from "react"
/* import {connect} from "react-redux" */
import {Redirect} from "react-router-dom"

import {withStyles} from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"

import cloneDeep from "lodash/cloneDeep"
import {Helmet} from "react-helmet"
import socket from "../../../services/socketio"
/* import {history} from "@utterzone/connector" */

import {Spacer} from "../../../components"
import AppContainer from "../../../apps/app-container"
/* import schema from "../../../core/schema.js" */
import Chat from "./chat/chat.js"
import Members from "./members/members.js"
import Notebook from "./notebook/notebook.js"
import {session} from "brownies"
/* import "react-select/dist/react-select.css" // comment out exclude node_modules for css-loader */

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
  app: {
    /* height: "300px" */
  },
  root: {
    backgroundColor: "#3e3e3e",
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
  resources: "",
  receiveMsg: "",
  user: {name: "beef"},
  usersList: [],
  isRegisterInProcess: false,
  chatrooms: null,
  client: socket()
}

class Zone extends Component {
  locationName = this.props.path

  state = cloneDeep(initialState)

  componentDidMount() {
    console.log("state: ", this.state)
    console.log("props: ", this.props)
    /* this.state.client.join(this.props.zone, this.props.user.username, () => */
    /*   console.log("User joined this zone!") */
    /* ) */

    this.state.client.usersList(usersList => {
      this.setState({
        usersList
      })
    })

    this.state.client.newMessage(data => {
      this.setState({receiveMsg: data})
    })
  }

  componentWillUnmount() {
    // TODO memory link in console.  Kill socket.io connection??
  }

  onLeaveZone = (zoneId, onLeaveSuccess) => {
    this.state.client.leave(zoneId, err => {
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
      this.sejState({isRegisterInProcess: false, user})
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
    const {classes, zone} = this.props
    const {username} = session.user
    /* const {chatHistory} = history.location.state */
    /* this.state.client.connected(zone) */
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
        <Spacer margin="8px" />
        <Grid container className={classes.root}>
          <Grid item xs={12} sm={12} md={6} lg={8} className={classes.app}>
            <AppContainer />
            <Members usersList={this.state.usersList} />
          </Grid>
          <Grid
            style={{
              background: "LightGray"
            }}
            item
            xs={12}
            sm={12}
            md={6}
            lg={4}>
            <Chat
              onLeave={() =>
                this.onLeaveZone(zone.id, () => history.push("/zones"))
              }
              user={this.state.user}
              registerHandler={this.state.client.registerHandler}
              unregisterHandler={this.state.client.unregisterHandler}
              onSendMessage={(message, cb) =>
                this.state.client.createMessage(username, zone.id, message, cb)
              }
              receiveMsg={this.state.receiveMsg}
              zone="changeme"
              usersList={this.state.usersList}
            />
          </Grid>
          <Grid item xs={12}>
            <Notebook />
          </Grid>
        </Grid>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Zone)
