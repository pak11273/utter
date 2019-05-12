/* eslint no-unused-vars:0 */
import React, {Component} from "react"
import {NavLink, withRouter} from "react-router-dom"
import styled from "styled-components"
import {_uid} from "../../layouts/login/containers/constants.js"
import {cookies, session} from "brownies"

import AccountCircle from "@material-ui/icons/AccountCircle"
import AccountBalanceWallet from "@material-ui/icons/AccountBalanceWallet"
import AssignmentIcon from "@material-ui/icons/Assignment"
import AppBar from "@material-ui/core/AppBar"
import Badge from "@material-ui/core/Badge"
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
import Graphic from "../../assets/images/navbar_logo.png"

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

  logout = e => {
    e.preventDefault()
    delete cookies._uid
    delete session.user
    this.props.history.push("/login")
  }

  handleProfileMenuOpen = event => {
    this.setState({anchorEl: event.currentTarget})
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
        <List>
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
        </List>
      </div>
    )

    const fullList = (
      <div className={classes.fullList}>
        <List>
          {[
            "Utterzone",
            "About",
            "Contact",
            "Pricing",
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

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{vertical: "top", horizontal: "right"}}
        transformOrigin={{vertical: "top", horizontal: "right"}}
        open={isMenuOpen}
        onClose={this.handleMenuClose}>
        {/* TODO: reinstate after beta */}
        {/*  {!isAuthenticated ? (
          <MenuItem onClick={this.handleSignup}>Sign Up</MenuItem>
        ) : null} */}
        {!isAuthenticated ? (
          <MenuItem onClick={this.handleBeta}>Beta</MenuItem>
        ) : null}
        {!isAuthenticated ? (
          <MenuItem onClick={this.login}>Login</MenuItem>
        ) : (
          <div>
            <MenuItem onClick={this.handleProfile}>Profile</MenuItem>
            <MenuItem onClick={this.handleAccount}>Account</MenuItem>
            <MenuItem onClick={this.logout}>Log Out</MenuItem>
          </div>
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
        {/* TODO: reinstate after beta */}
        {/*   {!isAuthenticated ? (
          <MenuItem onClick={this.handleSignup}>
            <IconButton color="inherit">
              <AssignmentIcon />
            </IconButton>
            <p className={classes.noMargin}>Sign Up</p>
          </MenuItem>
        ) : null} */}
        {!isAuthenticated ? (
          <MenuItem onClick={this.handleBeta}>
            <IconButton color="inherit">
              <AssignmentIcon />
            </IconButton>
            <p className={classes.noMargin}>Beta</p>
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
                to="community">
                Community
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
                <Badge badgeContent={0} color="secondary">
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

export default withRouter(withStyles(styles)(MainNavbar))
