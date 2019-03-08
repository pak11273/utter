/* eslint no-unused-vars:0 */
import React, {Component} from "react"
import {withRouter} from "react-router"
import {connect} from "react-redux"
import {NavLink} from "react-router-dom"
/* import PropTypes from "prop-types" */
import styled from "styled-components"
import schema from "../../core/schema"
import {AUTH_TOKEN} from "../../layouts/login/containers/constants.js"
import {local, session} from "brownies"

import AccountCircle from "@material-ui/icons/AccountCircle"
import AssignmentIcon from "@material-ui/icons/Assignment"
import AppBar from "@material-ui/core/AppBar"
import Badge from "@material-ui/core/Badge"
/* import Button from "@material-ui/core/Button" */
import Divider from "@material-ui/core/Divider"
import ExittoappIcon from "@material-ui/icons/ExitToApp"
import HomeIcon from "@material-ui/icons/Home"
import InfoIcon from "@material-ui/icons/Info"
import IconButton from "@material-ui/core/IconButton"
import InboxIcon from "@material-ui/icons/MoveToInbox"
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
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

/* import {Login} from "../index.js" */
import {Logo} from "../../components"

// images
import Graphic from "../../assets/images/logo.svg"

// actions
import {deleteData} from "../../api/actions"

const StyledNavLink = styled(NavLink)`
  grid-area: ${props => props.gridarea};
  color: #003478;
  &:hover {
    text-decoration: underline;
  }
`
const styles = theme => ({
  root: {
    width: "100%"
  },
  appBar: {
    backgroundColor: theme.palette.error.red,
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
  }
})

class MainNavbar extends Component {
  state = {
    showMenu: false,
    top: false,
    left: false,
    bottom: false,
    right: false
  }

  login = e => {
    e.preventDefault()
    this.props.history.push("/login")
  }

  logout = e => {
    e.preventDefault()
    delete local.AUTH_TOKEN
    delete session.user
    this.props.deleteData("user")
    this.props.history.push("/login")
  }

  handleProfileMenuOpen = event => {
    this.setState({anchorEl: event.currentTarget})
  }

  handleMenuClose = () => {
    this.setState({anchorEl: null})
    this.handleMobileMenuClose()
  }

  handleProfile = () => {
    this.setState({anchorEl: null})
    this.props.history.push(`/profile/${this.props.user.username}`)
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

  render() {
    // handle login section
    const isAuthenticated = local.AUTH_TOKEN

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
          {["Utterzone", "Courses", "Zones"].map((text, index) => {
            var icon = <MoodIcon />
            if (index === 0) {
              icon = <HomeIcon />
            } else if (index === 1) {
              icon = <LibraryBooksIcon />
            } else if (index === 2) {
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
        <List>
          {["About", "Contact", "Pricing"].map((text, index) => {
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
        </List>
      </div>
    )

    const fullList = (
      <div className={classes.fullList}>
        <List>
          {["Utterzone", "About", "Contact", "Pricing", "Courses", "Zones"].map(
            (text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            )
          )}
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    )

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{vertical: "top", horizontal: "right"}}
        transformOrigin={{vertical: "top", horizontal: "right"}}
        open={isMenuOpen}
        onClose={this.handleMenuClose}>
        <MenuItem onClick={this.handleProfile}>Profile</MenuItem>
        {!isAuthenticated ? (
          <MenuItem onClick={this.handleSignup}>Sign Up</MenuItem>
        ) : null}
        {!isAuthenticated ? (
          <MenuItem onClick={this.login}>Login</MenuItem>
        ) : (
          <MenuItem onClick={this.logout}>Log Out</MenuItem>
        )}
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
        <MenuItem onClick={this.handleMobileMenuClose}>
          <IconButton color="inherit">
            <Badge badgeContent={11} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p className={classes.noMargin}>Notifications</p>
        </MenuItem>
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p className={classes.noMargin}>Profile</p>
        </MenuItem>
        {!isAuthenticated ? (
          <MenuItem onClick={this.handleSignup}>
            <IconButton color="inherit">
              <AssignmentIcon />
            </IconButton>
            <p className={classes.noMargin}>Sign Up</p>
          </MenuItem>
        ) : null}
        {!isAuthenticated ? (
          <MenuItem onClick={this.login}>
            <IconButton color="inherit">
              <ExittoappIcon />
            </IconButton>
            <p className={classes.noMargin}>Login</p>
          </MenuItem>
        ) : (
          <MenuItem onClick={this.logout}>
            <IconButton color="inherit">
              <ExittoappIcon />
            </IconButton>
            <p className={classes.noMargin}>Log Out</p>
          </MenuItem>
        )}
      </Menu>
    )

    return (
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
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
                to="/about">
                About
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
                to="/contact">
                Contact
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
                to="/pricing">
                Pricing
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
              {/*  <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <MailIcon />
                </Badge>
              </IconButton> */}
              <IconButton color="inherit">
                <Badge badgeContent={17} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
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

MainNavbar.propTypes = {
  // menu: PropTypes.node.isRequired,
  /* largeMenuClassName: PropTypes.string, */
  /* smallMenuClassName: PropTypes.string, */
  /* changeMenuOn: PropTypes.string.isRequired */
  // menuOpenButton: PropTypes.node.isRequired,
  // menuCloseButton: PropTypes.node.isRequired
}

MainNavbar.defaultProps = {
  largeMenuClassName: "",
  smallMenuClassName: ""
}

const mapStateToProps = state => {
  // Create a Redux-ORM Session from our "entities" slice, which
  // contains the "tables" for each model type
  const session = schema.session(state.apiReducer)

  // Retrieve the model class that we need.  Each Session
  // specifically "binds" model classes to itself, so that
  // updates to model instances are applied to that session.
  // These "bound classes" are available as fields in the sesssion.
  const {User} = session

  // Query the session for all User instances.
  // The QuerySet that is returned from all() can be used to
  // retrieve instances of the User class, or retrieve the
  // plain JS objects that are actually in the store.
  // The toRefArray() method will give us an array of the
  // plain JS objects for each item in the QuerySet.
  const userObj = User.all().toRefArray()
  const user = userObj[0]

  return {
    user,
    userReducer: state.userReducer
  }
}

export default connect(
  mapStateToProps,
  {deleteData},
  null,
  {
    pure: false
  }
)(withRouter(withStyles(styles)(MainNavbar))) // {pure:false} needed for NavLink: activeStyle
