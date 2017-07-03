import React, {Component} from 'react'
import styled from 'styled-components'
import {NavLink} from 'react-router-dom'

const Login = styled.ul.attrs({})`

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

export default () =>
  <Login>
    <ul>
      <li><NavLink activeClassName="active" to="/signup">Sign Up</NavLink></li>
      <li><NavLink activeClassName="active" to="/login">Login</NavLink></li>
      <li>
        <NavLink activeClassName="active" to="/settings">Settings</NavLink>
      </li>
    </ul>
  </Login>
