import React, {Component} from 'react'
import {NavLink, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {Login} from '../../../containers'
import {Hamburger, Logo} from '../../../components'

// images
import Graphic from '../../../assets/images/logo.svg'

// actions
import {logout} from '../../../actions/authActions.js'

const Section = styled.section`
  align-items: center;
  background: ${props => props.background};
  box-sizing: border-box;
  display: flex;
  height: ${props => props.height}; 
  justify-content: flex-end;
  position: ${props => props.position};
  top: ${props => props.top};
  z-index: ${props => props.zindex};
  width: ${props => props.width};

  @media (min-width: 640px) {
    justify-content: center;
    min-width: 640px;
    }
`

Section.defaultProps = {
  background: 'black',
  position: 'fixed',
  height: '90px',
  top: '0',
  width: '100%',
  zindex: '99'
}

const SectionLeft = styled.section`
    display: none;
    align-items: center;

    @media (min-width: 640px) {
        display: flex;
        justify-content: 'flex-start';
        width: 800px;
      }
  `

SectionLeft.defaultProps = {
  margin: '0 auto'
}

const SectionRight = styled.section`
    background: none;
  `
const Nav = styled.ul`
    li {
     display: inline;
     font-size: 1rem;
     margin-left: 4rem;
    }
  `
const Menu = styled.ul`
    ul {
      li {
        display: none;
      }
    }

  @media (min-width: 960px) {
    ul {
      li {
        display: inline;
        font-size: 30px;
        margin-left: 2rem;
      }
    }
  }`

class Navbar extends Component {
  constructor(props) {
    super(props)
  }

  logout(e) {
    e.preventDefault()
    this.props.logout()
  }

  render(props) {
    const {isAuthenticated} = this.props.auth

    const userLinks = (
      <Menu>
        <ul>
          <li>
            <NavLink
              activeClassName="active"
              to="#"
              onClick={this.logout.bind(this)}>
              Log Out
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/settings">Settings</NavLink>
          </li>
        </ul>
      </Menu>
    )
    const guestLinks = <Login />
    return (
      <Section {...props}>
        <Hamburger />
        <SectionLeft>
          <NavLink to="/">
            <Logo
              background={`url(${Graphic}) center/cover no-repeat`}
              to="/"
              display="none"
              display768="block"
              width="48px"
              height="48px"
            />
          </NavLink>
          <Nav>
            <ul>
              {this.props.list.map((item, i) => {
                return (
                  <li key={i}>
                    <NavLink
                      exact
                      activeStyle={{
                        color: 'red'
                      }}
                      to={'/' + item}>
                      {item}
                    </NavLink>
                  </li>
                )
              })}
            </ul>
          </Nav>
        </SectionLeft>
        <SectionRight>
          {isAuthenticated ? userLinks : guestLinks}
        </SectionRight>
      </Section>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, {logout}, null, {pure: false})(Navbar) // {pure:false} needed for NavLink: activeStyle
