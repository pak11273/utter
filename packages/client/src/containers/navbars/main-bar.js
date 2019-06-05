/* eslint no-unused-vars:0 */
import React, {Component} from "react"
import {NavLink, withRouter} from "react-router-dom"
import {withApollo} from "react-apollo"
import styled from "styled-components"
import unionBy from "lodash/unionBy"
import {_uid} from "../../layouts/login/containers/constants.js"
import {cookies, local, session, subscribe} from "brownies"
import AccountCircle from "@material-ui/icons/AccountCircle"
import AccountBalanceWallet from "@material-ui/icons/AccountBalanceWallet"
import AssignmentIcon from "@material-ui/icons/Assignment"
import AppBar from "@material-ui/core/AppBar"
import Avatar from "@material-ui/core/Avatar"
import Badge from "@material-ui/core/Badge"
import Button from "@material-ui/core/Button"
import DraftsIcon from "@material-ui/icons/Drafts"
import Divider from "@material-ui/core/Divider"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import HomeIcon from "@material-ui/icons/Home"
import InfoIcon from "@material-ui/icons/Info"
import IconButton from "@material-ui/core/IconButton"
import InboxIcon from "@material-ui/icons/MoveToInbox"
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import LocalOfferIcon from "@material-ui/icons/LocalOffer"
import MenuItem from "@material-ui/core/MenuItem"
import Menu from "@material-ui/core/Menu"
/* import {fade} from "@material-ui/core/styles/colorManipulator" */
import {withStyles} from "@material-ui/core/styles"
import MenuIcon from "@material-ui/icons/Menu"
import MailIcon from "@material-ui/icons/Mail"
import MoodIcon from "@material-ui/icons/Mood"
import MoreIcon from "@material-ui/icons/MoreVert"
import NotificationsIcon from "@material-ui/icons/Notifications"
import QuestionAnswer from "@material-ui/icons/QuestionAnswer"
import SubjectIcon from "@material-ui/icons/Subject"
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"

import socketio from "../../services/socketio/socketio-mgr.js"
/* import {Login} from "../index.js" */
import {Logo} from "../../components"
import {
  ACCEPT_CONTACT_MUTATION,
  REJECT_CONTACT_MUTATION
} from "../../graphql/mutations/user-mutations.js"

// images
import Graphic from "../../assets/images/navbar_logo.png"
import ceoImg from "../../assets/images/ceo.jpg"

const StyledNavLink = styled(NavLink)`
  grid-area: ${props => props.gridarea};
  color: #003478;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`
const styles = theme => ({
  accept: {
    color: "white",
    backgroundColor: "green",
    marginLeft: "20px"
  },
  reject: {
    color: "white",
    backgroundColor: "red",
    marginLeft: "20px"
  },
  render_menu: {
    minWidth: "350px",
    minHeight: "50px",
    width: "100%"
  },
  root: {
    width: "100%"
  },
  appBar: {
    /* backgroundColor: theme.palette.error.red, */
    backgroundColor: "white",
    zIndex: theme.zIndex.drawer + 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  noMargin: {
    margin: 0
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
      paddingRight: "14px"
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  toolbar: {
    minHeight: "65px"
  }
})

class MainNavbar extends Component {
  state = {
    showMenu: false,
    top: false,
    left: false,
    bottom: false,
    invisible: true,
    right: false,
    navbarIcon: "",
    notifications: []
  }

  clearContactNotification = username => {
    var temp = local.notifications

    temp = temp.filter(obj => {
      return obj.username !== username
    })

    local.notifications = temp
  }

  acceptContact = async item => {
    console.log("accept: ", item)
    const result = await this.props.client.mutate({
      mutation: ACCEPT_CONTACT_MUTATION,
      variables: {
        senderUsername: item.username
      }
    })
    this.clearContactNotification(item.username)
    console.log("result: ", result)
    var temp = session.user
    temp.contacts.unshift(result.data.acceptContact)
    session.user = temp
  }

  rejectContact = item => {
    console.log("reject: ", item)
    this.props.client.mutate({
      mutation: REJECT_CONTACT_MUTATION,
      variables: {
        senderUsername: item.username
      }
    })

    this.clearContactNotification(item.username)
  }

  contactReceived = contact => {
    var sender = [{username: contact.from, __typename: "User"}]

    var temp = local.notifications
    local.notifications = unionBy(temp, sender, "username")
  }

  componentDidMount = async () => {
    socketio.newContactRequest(this.contactReceived)

    subscribe(local, "notifications", value => {
      if (!value) {
        value = []
      }
      console.log("value: ", value)
      this.setState({
        invisible: value.length === 0,
        notifications: value
      })
    })

    const result = new Promise(resolve => {
      const union = unionBy(
        this.state.notifications,
        local.notifications,
        "username"
      )
      resolve(union)
    })

    this.setState({
      notifications: await result
    })
    /* if (session.user && session.user.requests) { */
    /*   const {requests} = session.user */
    /*   var notifications = [...this.state.notifications, ...requests] */
    /*   this.setState( */
    /*     { */
    /*       notifications */
    /*     }, */
    /*     () => console.log("state: ", this.state.notifications) */
    /*   ) */
    /* } */
  }

  logout = e => {
    e.preventDefault()
    delete cookies._uid
    delete session.user
    delete session.friends
    delete local.notified
    delete local.notifications
    socketio.disconnect()
    this.props.history.push("/login")
  }

  handleProfileMenuOpen = event => {
    this.setState({
      anchorEl: event.currentTarget,
      navbarIcon: "settings"
    })
  }

  handleMenuClose = () => {
    this.setState({anchorEl: null})
    this.handleMobileMenuClose()
  }

  handleAccount = () => {
    this.setState({anchorEl: null})
    this.props.history.push(`/account/account-settings`)
    this.handleMobileMenuClose()
  }

  handleNotification = event => {
    event.persist()
    this.setState({
      anchorEl: event.currentTarget,
      navbarIcon: "notifications"
    })
  }

  handleBeta = () => {
    this.setState({anchorEl: null})
    this.props.history.push("/beta-access")
    this.handleMobileMenuClose()
  }

  handleProfile = () => {
    this.setState({anchorEl: null})
    this.props.history.push(`/profile/${session.user.username}`)
    this.handleMobileMenuClose()
  }

  handleSignup = () => {
    this.setState({anchorEl: null})
    this.props.history.push("/signup")
    this.handleMobileMenuClose()
  }

  handleMobileMenuOpen = event => {
    this.setState({mobileMoreAnchorEl: event.currentTarget})
  }

  handleMobileMenuClose = () => {
    this.setState({mobileMoreAnchorEl: null})
  }

  redirectTo = data => e => {
    data = data
      .trim()
      .replace(/\s+/g, "")
      .toLowerCase()
    if (data === "utterzone") {
      this.props.history.push("/")
    } else {
      this.props.history.push(`/${data}`)
    }
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    })
  }

  login = e => {
    e.preventDefault()
    this.props.history.push("/login", {notification: null})
  }

  render() {
    // handle login section
    const isAuthenticated = cookies._uid

    /* const userLinks = ( */
    /*   <Menu> */
    /*     <ul> */
    /*       <li> */
    /*         <StyledNavLink */
    /*           activeStyle={{ */
    /*             color: "red" */
    /*           }} */
    /*           to="#" */
    /*           onClick={this.logout}> */
    /*           Log Out */
    /*         </StyledNavLink> */
    /*       </li> */
    /*       <li> */
    /*         <StyledNavLink */
    /*           activeStyle={{ */
    /*             color: "red" */
    /*           }} */
    /*           to="/settings"> */
    /*           Settings */
    /*         </StyledNavLink> */
    /*       </li> */
    /*     </ul> */
    /*   </Menu> */
    /* ) */

    /* const guestLinks = <Login /> */

    const {anchorEl, mobileMoreAnchorEl} = this.state
    const {classes} = this.props
    const isMenuOpen = Boolean(anchorEl)
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

    const sideList = (
      <div className={classes.list}>
        <List>
          {["Utterzone", "Community", "Courses", "Zones"].map((text, index) => {
            var icon = <MoodIcon />
            if (index === 0) {
              icon = <HomeIcon />
            } else if (index === 1) {
              icon = <LibraryBooksIcon />
            } else if (index === 2) {
              icon = <LibraryBooksIcon />
            } else if (index === 3) {
              icon = <QuestionAnswer />
            }
            return (
              <ListItem button key={text} onClick={this.redirectTo(text)}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            )
          })}
        </List>
        <Divider />
        {/* <List>
          {["Pricing"].map((text, index) => {
            var icon = <MoodIcon />
            if (index === 0) {
              icon = <InfoIcon />
            } else if (index === 1) {
              icon = <SubjectIcon />
            } else if (index === 2) {
              icon = <LocalOfferIcon />
            }
            return (
              <ListItem button key={text} onClick={this.redirectTo(text)}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            )
          })}
        </List> */}
      </div>
    )

    const fullList = (
      <div className={classes.fullList}>
        <List>
          {[
            "Utterzone",
            "About",
            "Contact",
            "Courses",
            "Zones",
            "Community"
          ].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </div>
    )

    const notificationsMenu = (
      <div className={classes.render_menu}>
        {isAuthenticated && (
          <div>
            {this.state.notifications &&
              this.state.notifications.length > 0 &&
              this.state.notifications.map((item, i) => {
                if (item && item.username) {
                  return (
                    <React.Fragment key={i}>
                      <MenuItem>
                        <Typography variant="inherit">
                          New contact request from:
                        </Typography>
                      </MenuItem>
                      <MenuItem>
                        <ListItemAvatar>
                          <Avatar
                            alt={`Avatar n°${0 + 1}`}
                            src={`${ceoImg}`}
                            classes={{root: classes.avatar}}
                          />
                        </ListItemAvatar>
                        <Typography variant="inherit" color="primary">
                          &nbsp;
                          {item.username}
                        </Typography>
                        <Button
                          onClick={() => this.acceptContact(item)}
                          className={classes.accept}
                          variant="contained"
                          color="primary"
                          size="small">
                          Accept
                        </Button>
                        <Button
                          onClick={() => this.rejectContact(item)}
                          className={classes.reject}
                          variant="contained"
                          color="secondary"
                          size="small">
                          Reject
                        </Button>
                      </MenuItem>
                    </React.Fragment>
                  )
                }
              })}
          </div>
        )}
        {!isAuthenticated && (
          <MenuItem onClick={this.handleBeta}>Beta</MenuItem>
        )}
        {!isAuthenticated && <MenuItem onClick={this.login}>Login</MenuItem>}
      </div>
    )

    const settingsMenu = (
      <div>
        {/* {!isAuthenticated && (
          <MenuItem onClick={this.handleBeta}>Beta</MenuItem>
        )} */}
        {!isAuthenticated && (
          <MenuItem onClick={this.handleSignup}>Sign Up</MenuItem>
        )}
        {!isAuthenticated && <MenuItem onClick={this.login}>Login</MenuItem>}
        {isAuthenticated && (
          <div>
            <MenuItem onClick={this.handleProfile}>Profile</MenuItem>
            <MenuItem onClick={this.handleAccount}>Account</MenuItem>
            <MenuItem onClick={this.logout}>Log Out</MenuItem>
          </div>
        )}
      </div>
    )
    /*
        )} */

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{vertical: "top", horizontal: "right"}}
        transformOrigin={{vertical: "top", horizontal: "right"}}
        open={isMenuOpen}
        onClose={this.handleMenuClose}>
        {this.state.navbarIcon === "settings" && settingsMenu}
        {this.state.navbarIcon === "notifications" && notificationsMenu}
      </Menu>
    )

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{vertical: "top", horizontal: "right"}}
        transformOrigin={{vertical: "top", horizontal: "right"}}
        open={isMobileMenuOpen}
        onClose={this.handleMenuClose}>
        {/*  <MenuItem onClick={this.handleMobileMenuClose}>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem> */}
        {isAuthenticated ? (
          <div>
            <MenuItem onClick={this.handleNotification}>
              <IconButton color="inherit" onClick={this.handleNotification}>
                <Badge color="primary" invisible={this.state.invisible}>
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <p className={classes.noMargin}>Notifications</p>
            </MenuItem>
            <MenuItem onClick={this.handleProfile}>
              <IconButton color="inherit">
                <AccountCircle />
              </IconButton>
              <p className={classes.noMargin}>Profile</p>
            </MenuItem>
            <MenuItem onClick={this.handleAccount}>
              <IconButton color="inherit">
                <AccountBalanceWallet />
              </IconButton>
              <p className={classes.noMargin}>Account</p>
            </MenuItem>
          </div>
        ) : null}
        {!isAuthenticated ? (
          <MenuItem onClick={this.handleSignup}>
            <IconButton color="inherit">
              <AssignmentIcon />
            </IconButton>
            <p className={classes.noMargin}>Sign Up</p>
          </MenuItem>
        ) : null}
        {/*  {!isAuthenticated ? (
          <MenuItem onClick={this.handleBeta}>
            <IconButton color="inherit">
              <AssignmentIcon />
            </IconButton>
            <p className={classes.noMargin}>Beta</p>
          </MenuItem>
        ) : null} */}
        {!isAuthenticated ? (
          <MenuItem onClick={this.login}>
            <IconButton color="inherit">
              <ExitToAppIcon />
            </IconButton>
            <p className={classes.noMargin}>Login</p>
          </MenuItem>
        ) : (
          <MenuItem onClick={this.logout}>
            <IconButton color="inherit">
              <ExitToAppIcon />
            </IconButton>
            <p className={classes.noMargin}>Log Out</p>
          </MenuItem>
        )}
      </Menu>
    )

    return (
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Open drawer"
              onClick={this.toggleDrawer("left", true)}>
              <MenuIcon />
            </IconButton>
            <Typography
              className={classes.title}
              variant="h6"
              color="inherit"
              noWrap>
              <StyledNavLink to="/">
                <Logo
                  background={`url(${Graphic}) center/cover no-repeat`}
                  display="none"
                  display768="flex"
                  width="48px"
                  height="48px"
                />
              </StyledNavLink>
            </Typography>
            <Typography
              className={classes.title}
              variant="h6"
              color="inherit"
              noWrap>
              <StyledNavLink
                exact
                activeStyle={{
                  color: "red"
                }}
                to="community">
                Community
              </StyledNavLink>
            </Typography>
            {/*    <Typography
              className={classes.title}
              variant="h6"
              color="inherit"
              noWrap>
              <StyledNavLink
                exact
                activeStyle={{
                  color: "red"
                }}
                to="/pricing">
                Pricing
              </StyledNavLink>
            </Typography> */}
            <Typography
              className={classes.title}
              variant="h6"
              color="inherit"
              noWrap>
              <StyledNavLink
                exact
                activeStyle={{
                  color: "red"
                }}
                to="/courses">
                Courses
              </StyledNavLink>
            </Typography>
            <Typography
              className={classes.title}
              variant="h6"
              color="inherit"
              noWrap>
              <StyledNavLink
                exact
                activeStyle={{
                  color: "red"
                }}
                to="/zones">
                Zones
              </StyledNavLink>
            </Typography>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              {isAuthenticated && (
                <IconButton color="inherit" onClick={this.handleNotification}>
                  <Badge color="primary" invisible={this.state.invisible}>
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              )}
              <IconButton
                aria-owns={isMenuOpen ? "material-appbar" : undefined}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit">
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-haspopup="true"
                onClick={this.handleMobileMenuOpen}
                color="inherit">
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        <SwipeableDrawer
          open={this.state.left}
          onClose={this.toggleDrawer("left", false)}
          onOpen={this.toggleDrawer("left", true)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer("left", false)}
            onKeyDown={this.toggleDrawer("left", false)}>
            {sideList}
          </div>
        </SwipeableDrawer>
        <SwipeableDrawer
          anchor="top"
          open={this.state.top}
          onClose={this.toggleDrawer("top", false)}
          onOpen={this.toggleDrawer("top", true)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer("top", false)}
            onKeyDown={this.toggleDrawer("top", false)}>
            {fullList}
          </div>
        </SwipeableDrawer>
        <SwipeableDrawer
          anchor="bottom"
          open={this.state.bottom}
          onClose={this.toggleDrawer("bottom", false)}
          onOpen={this.toggleDrawer("bottom", true)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer("bottom", false)}
            onKeyDown={this.toggleDrawer("bottom", false)}>
            {fullList}
          </div>
        </SwipeableDrawer>
        <SwipeableDrawer
          anchor="right"
          open={this.state.right}
          onClose={this.toggleDrawer("right", false)}
          onOpen={this.toggleDrawer("right", true)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer("right", false)}
            onKeyDown={this.toggleDrawer("right", false)}>
            {sideList}
          </div>
        </SwipeableDrawer>
        {renderMenu}
        {renderMobileMenu}
      </div>
    )
  }
}

export default withRouter(withStyles(styles)(withApollo(MainNavbar)))
