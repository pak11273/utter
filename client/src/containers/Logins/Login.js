import React, {Component} from 'react'
import styled from 'styled-components'

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
      <li><a href="">Login</a></li>
      <li><a href="">Settings</a></li>
    </ul>
  </Login>
