import React, {Component} from "react"
import {Redirect} from "react-router-dom"
import {withApollo} from "react-apollo"
import {toast} from "react-toastify"

import {withStyles} from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"

import socket from "../../../services/socketio"
/* import {history} from "@utterzone/connector" */

import AppContainer from "../../../apps/app-container"
/* import schema from "../../../core/schema.js" */
import Chat from "./chat/chat.js"
import Members from "./members/members.js"
import Notebook from "./notebook/notebook.js"
import {session} from "brownies"

import {GET_LEVELS, GET_LEVEL} from "../../../graphql/queries/level-queries.js"
import {REZONE} from "../../../graphql/queries/zone-queries.js"

const styles = theme => ({
  app: {
    /* height: "300px" */
  },
  root: {
    backgroundColor: "#3e3e3e",
    flexGrow: 1,
    marginTop: -20
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  }
})

const Loader = () => <div>Loading...</div>

class Zone extends Component {
  locationName = this.props.path

  state = {
    resources: "",
    receiveMsg: "",
    user: {name: "beef"},
    usersList: [],
    isRegisterInProcess: false,
    chatrooms: null,
    client: socket(),
    host: false
  }

  componentDidMount = () => {
    this.state.client.usersList(usersList => {
      this.setState(
        {
          usersList
        },
        console.log("userlist; ", this.state.usersList)
      )
    })

    this.state.client.newMessage(data => {
      this.setState({receiveMsg: data})
    })

    // rehydrate levels and vocabulary for returning hosts
    const {zoneId} = this.props.history.location.state
    const hostedZoneId = session.user.hostedZone && session.user.hostedZone._id
    if (zoneId === hostedZoneId || session.zone._id === hostedZoneId) {
      this.setState(
        {
          host: true
        },
        async () => {
          if (this.state.host) {
            const onComplete = (zone, courseLevel, courseLevels) => {
              session.levels = courseLevels.data.getLevels.levels
              session.vocabulary = courseLevel.data.getLevel.vocabulary
              session.modifier =
                courseLevels.data.getLevels.levels[session.level - 1].modifier

              toast.success("You have successfully reconnected to your zone.", {
                className: "toasty",
                bodyClassName: "toasty-body",
                hideProgressBar: true
              })
            }

            try {
              const zone = await this.props.client.query({
                query: REZONE,
                variables: {
                  username: session.user.username
                }
              })

              // rehydrate zone
              session.zone = zone.data.rezone
              session.level = zone.data.rezone.courseLevel

              // if zone is legit
              if (zone) {
                const courseLevels = await this.props.client.query({
                  fetchPolicy: "network-only",
                  query: GET_LEVELS,
                  variables: {
                    courseId: zone.data.rezone.course._id
                  }
                })

                const courseLevel = await this.props.client.query({
                  query: GET_LEVEL,
                  variables: {
                    levelId:
                      courseLevels.data.getLevels.levels[session.level - 1]._id
                  }
                })

                onComplete(zone, courseLevel, courseLevels)
              }
            } catch (err) {
              /* console.error("TEST ERR =>", err.graphQLErrors.map(x => x.message)); */
              const msg = err.message.replace("GraphQL error:", "").trim()
              if (err.message.indexOf("You can only host") !== -1) {
                toast.warn(msg, {
                  className: "toasty",
                  bodyClassName: "toasty-body",
                  hideProgressBar: true
                })
              }
            }
          }
        }
      )
    }
  }

  componentWillUnmount() {
    // TODO memory leak in console.  Kill socket.io connection??
  }

  onLeaveZone = (zoneId, onLeaveSuccess) => {
    this.state.client.leave(zoneId, err => {
      if (err) return console.error(err)
      return onLeaveSuccess()
    })
    // TODO notify remaining occupants that host has left the zone.
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
    const {username} = (session && session.user) || {username: ""}
    /* const {chatHistory} = history.location.state */
    /* this.state.client.connected(zone) */
    return (
      <React.Fragment>
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
              host={this.state.host}
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

export default withStyles(styles)(withApollo(Zone))
