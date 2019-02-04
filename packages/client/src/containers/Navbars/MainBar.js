import React, {Component} from "react"
import {withRouter} from "react-router"
import {connect} from "react-redux"
import {NavLink} from "react-router-dom"
import PropTypes from "prop-types"
import styled from "styled-components"
import schema from "../../core/schema"
import {AUTH_TOKEN} from "../../layouts/login/containers/constants.js"
import "./styles.css"

import {Login} from "../index.js"
import {Box, Hamburger, Logo, Section} from "../../components"

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

const NavSection = styled(Section)`
  background: ${props => props.background};
  box-sizing: border-box;
  display: grid;
  grid-template-areas: "logo navigation portal";
  grid-template-columns: 1fr 2fr 1fr;
  height: 50px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 99;
  @media (min-width: 640px) {
    height: 50px !important;
  }
`

NavSection.defaultProps = {
  background: "#F6D155"
}

const SectionLeft = styled.section`
  display: flex;
  grid-area: ${props => props.gridarea};

  @media (min-width: 640px) {
    align-items: center;
    display: flex;
    justify-content: flex-start;
  }
`

const SectionRight = styled.section`
  a {
    color: #003478;
  }
  align-items: flex-start;
  padding: 17px 0 0 0;
  background: none;
  width: 200px;

  display: flex;
  grid-area: ${props => props.gridarea};
`

const Nav = styled.div`
  ul {
    padding: 0;
  }
  li {
    display: inline;
    font-size: 13px;
    list-style-type: none;
    margin-left: 30px;
  }
  a {
    text-decoration: none;
    font-size: 1rem;
    color: #003478;
    &:hover {
      color: white;
      text-decoration: underline;
    }
  }
  @media (max-width: 640px) {
    padding: 10px 0;
    li {
      padding: 10px 0;
      display: block;
      margin-left: 0;
    }
  }
`

const Menu = styled.ul`
  display: flex;
  width: 185px;
  ul {
    li {
      color: #1e74b7;
      display: inline;
      font-size: 1rem;
      margin-left: 2rem;
    }
  }
`
const SmallMenu = styled.div`
  display: none;
  text-align: center;
  @media (max-width: ${props => props.maxwidth}) {
    display: block;
  }
`
const LargeMenu = styled.div`
  display: block;
  text-align: center;
  @media (max-width: ${props => props.maxwidth}) {
    display: none;
  }
`

class MainNavbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showMenu: false
    }
  }

  handleHamburger = () => {
    this.setState({showMenu: !this.state.showMenu})
    var navSection = document.getElementById("NavSection")
    var spacer = document.getElementById("spacer")
    if (!this.state.showMenu) {
      navSection.style.height = "250px"
      spacer.style.margin = "250px 0 0 0"
    } else {
      navSection.style.height = "50px"
      spacer.style.margin = "50px 0 0 0"
    }
  }

  logout = e => {
    e.preventDefault()
    localStorage.removeItem(AUTH_TOKEN)
    this.props.deleteData("user")
    this.props.history.push("/login")
  }

  render() {
    const {
      list,
      largeMenuClassName,
      smallMenuClassName,
      changeMenuOn
    } = this.props

    // handle login section
    const isAuthenticated = localStorage.getItem(AUTH_TOKEN)

    const userLinks = (
      <Menu>
        <ul>
          <li>
            <StyledNavLink
              activeStyle={{
                color: "red"
              }}
              to="#"
              onClick={this.logout}>
              Log Out
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink
              activeStyle={{
                color: "red"
              }}
              to="/settings">
              Settings
            </StyledNavLink>
          </li>
        </ul>
      </Menu>
    )

    const guestLinks = <Login />

    return (
      <NavSection id="NavSection">
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
                {/* add custom ON button here */}
              </div>
            ) : (
              <div>
                <Hamburger padding="9px 0 0 0" onClick={this.handleHamburger} />
                {/* add custom OFF button here */}
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
    )
  }
}

MainNavbar.propTypes = {
  // menu: PropTypes.node.isRequired,
  largeMenuClassName: PropTypes.string,
  smallMenuClassName: PropTypes.string,
  changeMenuOn: PropTypes.string.isRequired
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
)(withRouter(MainNavbar)) // {pure:false} needed for NavLink: activeStyle
