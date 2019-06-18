import React, {PureComponent} from "react"
import Drawer from "@material-ui/core/Drawer"
import classNames from "classnames"
import {withStyles} from "@material-ui/core/styles"

import Avatar from "@material-ui/core/Avatar"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"
import Divider from "@material-ui/core/Divider"
import IconButton from "@material-ui/core/IconButton"
import InboxIcon from "@material-ui/icons/MoveToInbox"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import PeopleIcon from "@material-ui/icons/People"
import PersonIcon from "@material-ui/icons/Person"
import {CustomBadge} from "../components/custom-badge.js"
/* import {session} from "brownies" */
import {styles} from "../styles.js"

import {Spacer} from "../../../components"

class ZoneLeftDrawer extends PureComponent {
  state = {
    contacts: [],
    friends: [],
    leftOpen: false,
    open: false
  }

  handleDrawerLeftOpen = () => {
    this.setState({
      leftOpen: true
    })
  }

  handleDrawerLeftClose = () => {
    this.setState({
      leftOpen: false
    })
  }

  render() {
    const {classes} = this.props
    return (
      <Drawer
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
          {/* TODO: change personal online stat 
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
          </ListItem> */}
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
          {this.props.contacts.map((item, i) => {
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
      </Drawer>
    )
  }
}

export default withStyles(styles)(ZoneLeftDrawer)
