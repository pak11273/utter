import React, {Component} from "react"
import {connect} from "react-redux"
import {Redirect} from "react-router-dom"

import {withStyles} from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"

import {cloneDeep} from "lodash"
import {Helmet} from "react-helmet"
import socket from "../../../services/socketio"
import {history} from "@utterzone/connector"

import Members from "./members"
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
    this.state.client.join(this.props.zone, this.props.user.username, () =>
      console.log("User joined this zone!")
    )

    this.state.client.usersList(usersList => {
      this.setState({
        usersList
      })
    })

    this.state.client.newMessage(data => {
      this.setState({receiveMsg: data})
    })

    this.props.toggleFooter(false)
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
    const {classes, zone} = this.props
    const {username} = this.props.user
    /* const {chatHistory} = history.location.state */
    this.state.client.connected(zone)
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
          <Grid
            style={{
              background: "LightGray"
            }}
            item
            xs={12}
            sm={12}
            md={4}
            lg={3}>
            <Chat
              usersList={this.state.usersList}
              user={this.state.user}
              onLeave={() =>
                this.onLeaveZone(zone.id, () => history.push("/zones"))
              }
              onSendMessage={(message, cb) =>
                this.state.client.createMessage(username, zone.id, message, cb)
              }
              receiveMsg={this.state.receiveMsg}
              registerHandler={this.state.client.registerHandler}
              unregisterHandler={this.state.client.unregisterHandler}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={9}>
            <Members usersList={this.state.usersList} />
          </Grid>
          <Grid
            style={{
              background: "LightGray"
            }}
            item
            xs={12}
            sm={12}
            md={4}
            lg={3}>
            <div style={{background: "LightGray"}} />
          </Grid>
        </Grid>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  const session = schema.session(state.apiReducer)
  const {Zone, User} = session
  const zoneObj = Zone.all().toRefArray()
  const userObj = User.all().toRefArray()
  const zone = zoneObj[0]
  const user = userObj[0]

  return {
    user,
    zone
  }
}

export default connect(
  mapStateToProps,
  {toggleFooter}
)(withStyles(styles)(Zone))
