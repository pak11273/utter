import React, {Component} from 'react'
import styled from 'styled-components'

const Login = styled.ul`
    li {
      display: inline;
      margin-left: 2rem;
    }
  `
const LoginRegView = () =>
  <Login>
    <li>Login</li>
    <li>Settings</li>
  </Login>

export default LoginRegView
