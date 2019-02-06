/* eslint no-unused-vars:0 */
import React, {Component} from "react"
import {withRouter} from "react-router"
import {connect} from "react-redux"
import {NavLink} from "react-router-dom"
/* import PropTypes from "prop-types" */
import styled from "styled-components"
import schema from "../../core/schema"
import {AUTH_TOKEN} from "../../layouts/login/containers/constants.js"

import AccountCircle from "@material-ui/icons/AccountCircle"
import AssignmentIcon from "@material-ui/icons/Assignment"
import AppBar from "@material-ui/core/AppBar"
import Badge from "@material-ui/core/Badge"
/* import Button from "@material-ui/core/Button" */
import Divider from "@material-ui/core/Divider"
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

/* const NavSection = styled(Section)` */
/*   background: ${props => props.background}; */
/*   box-sizing: border-box; */
/*   display: grid; */
/*   grid-template-areas: "logo navigation portal"; */
/*   grid-template-columns: 1fr 2fr 1fr; */
/*   height: 50px; */
/*   position: fixed; */
/*   top: 0; */
/*   width: 100%; */
/*   z-index: 99; */
/*   @media (min-width: 640px) { */
/*     height: 50px !important; */
/*   } */
/* ` */

/* NavSection.defaultProps = { */
/*   background: "#F6D155" */
/* } */

/* const SectionLeft = styled.section` */
/*   display: flex; */
/*   grid-area: ${props => props.gridarea}; */

/*   @media (min-width: 640px) { */
/*     align-items: center; */
/*     display: flex; */
/*     justify-content: flex-start; */
/*   } */
/* ` */

/* const SectionRight = styled.section` */
/*   a { */
/*     color: #003478; */
/*   } */
/*   align-items: flex-start; */
/*   padding: 17px 0 0 0; */
/*   background: none; */
/*   width: 200px; */

/*   display: flex; */
/*   grid-area: ${props => props.gridarea}; */
/* ` */

/* const Nav = styled.div` */
/*   ul { */
/*     padding: 0; */
/*   } */
/*   li { */
/*     display: inline; */
/*     font-size: 13px; */
/*     list-style-type: none; */
/*     margin-left: 30px; */
/*   } */
/*   a { */
/*     text-decoration: none; */
/*     font-size: 1rem; */
/*     color: #003478; */
/*     &:hover { */
/*       color: white; */
/*       text-decoration: underline; */
/*     } */
/*   } */
/*   @media (max-width: 640px) { */
/*     padding: 10px 0; */
/*     li { */
/*       padding: 10px 0; */
/*       display: block; */
/*       margin-left: 0; */
/*     } */
/*   } */
/* ` */

/* const Menu = styled.ul` */
/*   display: flex; */
/*   width: 185px; */
/*   ul { */
/*     li { */
/*       color: #1e74b7; */
/*       display: inline; */
/*       font-size: 1rem; */
/*       margin-left: 2rem; */
/*     } */
/*   } */
/* ` */
/* const SmallMenu = styled.div` */
/*   display: none; */
/*   text-align: center; */
/*   @media (max-width: ${props => props.maxwidth}) { */
/*     display: block; */
/*   } */
/* ` */
/* const LargeMenu = styled.div` */
/*   display: block; */
/*   text-align: center; */
/*   @media (max-width: ${props => props.maxwidth}) { */
/*     display: none; */
/*   } */
/* ` */

const styles = theme => ({
  root: {
    width: "100%"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
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
    localStorage.removeItem(AUTH_TOKEN)
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
    /* const { */
    /*   list, */
    /*   largeMenuClassName, */
    /*   smallMenuClassName, */
    /*   changeMenuOn */
    /* } = this.props */

    // handle login section
    const isAuthenticated = localStorage.getItem(AUTH_TOKEN)

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
          {["About", "Contact", "Pricing", "Sign Up"].map((text, index) => {
            var icon = <MoodIcon />
            if (index === 0) {
              icon = <InfoIcon />
            } else if (index === 1) {
              icon = <SubjectIcon />
            } else if (index === 2) {
              icon = <LocalOfferIcon />
            } else if (index === 3) {
              icon = <AssignmentIcon />
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
        <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
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
        <MenuItem onClick={this.handleMobileMenuClose}>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem onClick={this.handleMobileMenuClose}>
          <IconButton color="inherit">
            <Badge badgeContent={11} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
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
              <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <MailIcon />
                </Badge>
              </IconButton>
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

/*   <NavSection id="NavSection">
        <Box alignitems="flex-end" gridarea="logo">
          <StyledNavLink to="/">
            <Logo
              background={`url(${Graphic}) center/cover no-repeat`}
              display="none"
              display768="flex"
              width="48px"
              height="48px"
            />
          </StyledNavLink>
        </Box>
        <SectionLeft id="sectionLeft" gridarea="navigation">
          <LargeMenu className={largeMenuClassName} maxwidth={changeMenuOn}>
            <Nav>
              <ul>
                {list.map((item, i) => {
                  let update = null
                  if (item === "courses") {
                    update = this.forceUpdate
                  }
                  return (
                    <li key={i}>
                      <StyledNavLink
                        onClick={update}
                        exact
                        activeStyle={{
                          color: "red"
                        }}
                        to={"/" + item}>
                        {item}
                      </StyledNavLink>
                    </li>
                  )
                })}
              </ul>
            </Nav>
          </LargeMenu>
          <SmallMenu className={smallMenuClassName} maxwidth={changeMenuOn}>
            {!this.state.showMenu ? (
              <div>
                <Hamburger padding="9px 0 0 0" onClick={this.handleHamburger} />
                {/* add custom ON button here 
              </div>
            ) : (
              <div>
                <Hamburger padding="9px 0 0 0" onClick={this.handleHamburger} />
                {/* add custom OFF button here 
              </div>
            )}
            {this.state.showMenu ? (
              <Nav>
                <ul>
                  {list.map((item, i) => {
                    let update = null
                    if (item === "courses") {
                      update = this.forceUpdate
                    }
                    return (
                      <li key={i}>
                        <StyledNavLink
                          onClick={update}
                          exact
                          activeStyle={{
                            color: "red"
                          }}
                          to={"/" + item}>
                          {item}
                        </StyledNavLink>
                      </li>
                    )
                  })}
                </ul>
              </Nav>
            ) : null}
          </SmallMenu>
        </SectionLeft>
        <SectionRight gridarea="portal">
          {isAuthenticated ? userLinks : guestLinks}
        </SectionRight>
      </NavSection>
		*/
