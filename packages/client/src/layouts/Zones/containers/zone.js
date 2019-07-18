import React, {Component} from "react"
import {Redirect} from "react-router-dom"
import {withApollo} from "react-apollo"
import {toast} from "react-toastify"

import {withStyles} from "@material-ui/core/styles"
/* import Grid from "@material-ui/core/Grid" */

import socketio from "../../../services/socketio/socketio-mgr.js"
import AppContainer from "../../../apps/app-container"
/* import Badge from "@material-ui/core/Badge" */
/* import Button from "@material-ui/core/Button" */
import Avatar from "@material-ui/core/Avatar"
import Chat from "./chat/chat.js"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"
import classNames from "classnames"
import Drawer from "@material-ui/core/Drawer"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
/* import ListItemIcon from "@material-ui/core/ListItemIcon" */
/* import ListItemText from "@material-ui/core/ListItemText" */
/* import InboxIcon from "@material-ui/icons/MoveToInbox" */
import Divider from "@material-ui/core/Divider"
import IconButton from "@material-ui/core/IconButton"
/* import MailIcon from "@material-ui/icons/Mail" */
/* import PeopleIcon from "@material-ui/icons/People" */
import PersonIcon from "@material-ui/icons/Person"
import {Flex, Spacer, ZoneMembersTooltip} from "../../../components"
/* import Members from "./members/members.js" */
import Notebook from "./notebook/notebook.js"
import {session} from "brownies"
import ZoneLeftDrawer from "./zone-left-drawer.js"

import {GET_LEVELS, GET_LEVEL} from "../../../graphql/queries/level-queries.js"
import {REZONE} from "../../../graphql/queries/zone-queries.js"
import {styles} from "../styles.js"
/* import {CustomBadge} from "../components/custom-badge.js" */

const Loader = () => <div>Loading...</div>

class Zone extends Component {
  locationName = this.props.path

  state = {
    arrowRef: null,
    contacts: [],
    friends: session.friends,
    resources: "",
    receiveMsg: "",
    user: {name: "beef"},
    usersList: [],
    isRegisterInProcess: false,
    chatrooms: null,
    host: false,
    open: false,
    leftOpen: true,
    rightOpen: false,
    socketio
  }

  componentDidMount = async () => {
    // Creates a userzone and receives online stat of all contacts
    /* const userData = { */
    /*   username: session.user.username, */
    /*   _id: session.user._id, */
    /*   stat: "online" */
    /* } */

    // TODO: if user already in zone, can't reenter
    /* this.state.socketio.getUser */

    // socketize zone
    socketio.zoneConnect({
      username: session.user && session.user.username,
      zoneId: this.props.history.location.state.zoneId,
      zoneName: this.props.history.location.state.zoneName
    })

    const {zoneId} = this.props.history.location.state
    this.state.socketio.usersList(usersList => {
      this.setState({
        usersList
      })
    })

    // rehydrate levels and vocabulary for returning hosts
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
    alert("You are leaving the zone")
    this.onLeaveZone(() => this.props.history.push("/zones"))
  }

  onLeaveZone = onLeaveSuccess => {
    socketio.zoneDisconnect({
      username: session.user.username,
      zoneId: session.zone._id,
      zoneName: session.zone.zoneName
    })
    onLeaveSuccess()
    /* this.state.socketio.leave(zoneId, err => { */
    /*   if (err) return console.error(err) */
    /*   return onLeaveSuccess() */
    /* }) */
    // TODO notify remaining occupants that host has left the zone.
  }

  getZones = () => {
    this.state.client.getZones((err, chatrooms) => {
      this.setState({chatrooms})
    })
  }

  handleArrowRef = node => {
    this.setState({
      arrowRef: node
    })
  }

  handleClose = () => {
    this.setState({
      open: false
    })
  }

  openModal = () => {
    this.setState({
      open: true
    })
  }

  register = name => {
    const onRegisterResponse = user =>
      this.sejState({isRegisterInProcess: false, user})
    this.setState({isRegisterInProcess: true})
    this.state.socketio.register(name, (err, user) => {
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

  handleDrawerLeftOpen = () => {
    this.setState({leftOpen: true})
  }

  handleDrawerLeftClose = () => {
    this.setState({leftOpen: false})
  }

  handleDrawerRightOpen = () => {
    this.setState({rightOpen: true})
  }

  handleDrawerRightClose = () => {
    this.setState({rightOpen: false})
  }

  render() {
    const {classes} = this.props
    const {zone} = session
    const {username} = (session && session.user) || {username: ""}
    /* const {chatHistory} = history.location.state */
    /* this.state.socketio.connected(zone) */
    return (
      <Flex className={classes.rootZone}>
        <ZoneLeftDrawer contacts={this.state.contacts} />
        {/* <Drawer
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerLeOpen]: this.state.leftOpen,
            [classes.drawerLeftClose]: !this.state.leftOpen
          })}
          classes={{
            paper: classNames({
              [classes.drawerLeOpen]: this.state.leftOpen,
              [classes.drawerLeftClose]: !this.state.leftOpen
            })
          }}
          open={this.state.open}>
          <div>
            <Spacer margin="64px 0 0 0" />
            {!this.state.leftOpen ? (
              <IconButton
                className={classes.closeArrow}
                onClick={this.handleDrawerLeftOpen}>
                <ChevronRightIcon />
              </IconButton>
            ) : (
              <IconButton
                className={classes.closeArrow}
                onClick={this.handleDrawerLeftClose}>
                <ChevronLeftIcon />
              </IconButton>
            )}
          </div>
          <Divider />
          <List>
            <ListItem key="self">
              <CustomBadge background="e3e3e3" />
              <Avatar
                alt={`Avatar n°${0 + 1}`}
                classes={{root: classes.avatar}}
                src={
                  session.user.avatar === "default.png"
                    ? null
                    : session.user.avatar
                }>
                <PersonIcon />
              </Avatar>
              <ListItemText primary={session.user && session.user.username} />
            </ListItem>
          </List>
          <List>
            {["Contacts"].map((item, index) => (
              <ListItem button key={item}>
                <ListItemIcon>
                  {index % 2 === 0 ? <PeopleIcon /> : <InboxIcon />}
                </ListItemIcon>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
          <List>
            {this.state.contacts.map((item, i) => {
              var badgeColor = "#e3e3e3"
              if (item.username) {
                switch (item.stat) {
                  case "online":
                    badgeColor = "lime"
                    break
                  case "offline":
                    badgeColor = "#e3e3e3"
                    break
                  default:
                    badgeColor = "#e3e3e3"
                }
              }
              return (
                <ListItem button key={i}>
                  <CustomBadge background={badgeColor} />
                  <Avatar
                    alt={`Avatar n°${0 + 1}`}
                    classes={{root: classes.avatar}}>
                    <PersonIcon />
                  </Avatar>
                  <ListItemText primary={item && item.username} />
                </ListItem>
              )
            })}
          </List>
          <Divider />
        </Drawer> */}
        <Flex direction="column">
          <AppContainer />
          {/* <Members usersList={this.state.usersList} /> */}
        </Flex>
        <Flex
          style={{
            background: "LightGray"
          }}>
          <Chat
            host={this.state.host}
            onLeave={() =>
              this.onLeaveZone(zone._id, () => history.push("/zones"))
            }
            user={this.state.user}
            onSendMessage={(message, cb) =>
              this.state.socketio.createMessage({
                username,
                zoneId: zone._id,
                message,
                cb
              })
            }
            newMessage={this.state.socketio.newMessage}
            zone="changeme"
            usersList={this.state.usersList}
          />
          <Notebook />
        </Flex>
        {/* Right Drawer */}
        <Drawer
          anchor="right"
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerRightOpen]: this.state.rightOpen,
            [classes.drawerRightClose]: !this.state.rightOpen
          })}
          classes={{
            paper: classNames({
              [classes.drawerRightOpen]: this.state.rightOpen,
              [classes.drawerRightClose]: !this.state.rightOpen
            })
          }}
          open={this.state.rightOpen}>
          <div>
            <Spacer margin="64px 0 0 0" />
            {!this.state.rightOpen ? (
              <IconButton
                className={classes.closeArrow}
                onClick={this.handleDrawerRightOpen}>
                <ChevronLeftIcon />
              </IconButton>
            ) : (
              <IconButton
                className={classes.closeArrow}
                onClick={this.handleDrawerRightClose}>
                <ChevronRightIcon />
              </IconButton>
            )}
          </div>
          <Divider />
          <List
            style={{
              alignItems: "flex-start",
              display: "flex",
              flexWrap: "wrap"
            }}
            dense={true}>
            {this.state.usersList.map((item, index) => (
              <React.Fragment key={item}>
                <ZoneMembersTooltip
                  username={item}
                  socketio={this.state.socketio}>
                  <ListItem
                    button
                    style={{
                      color: "#fafafa",
                      padding: "10px",
                      width: "56px"
                    }}
                    key={index}>
                    <ListItemAvatar>
                      <Avatar alt={`Avatar n°${0 + 1}`}>
                        <PersonIcon />
                      </Avatar>
                    </ListItemAvatar>
                  </ListItem>
                </ZoneMembersTooltip>
              </React.Fragment>
            ))}
          </List>
        </Drawer>
      </Flex>
    )
  }
}

export default withStyles(styles, {withTheme: true})(withApollo(Zone))
