import React, {Component} from 'react'
import styled from 'styled-components'
import {NavLink} from 'react-router-dom'

const Menu = styled.div`
  font-size: 1rem;
  margin-left: 2rem;
  ul {
    li {
      display: inline;
      color: #2196f3;
      margin: 0 20px 0 0;
    }
  }
`
const StyledNavLink = styled(NavLink)`
  color: #2196f3;
  &:hover {
    text-decoration: underline;
  }
`

export default () => (
  <Menu>
    <ul>
      <li>
        <StyledNavLink
          activeStyle={{
            color: 'red'
          }}
          to="/signup">
          Sign Up
        </StyledNavLink>
      </li>
      <li>
        <StyledNavLink
          activeStyle={{
            color: 'red'
          }}
          to="/login">
          Login
        </StyledNavLink>
      </li>
    </ul>
  </Menu>
)
