import React, {Component} from 'react'
import styled, {ThemeProvider} from 'styled-components'
import {Masthead} from '../../containers'
import {Wrapper} from '../../components'
import LoginForm from './containers/LoginForm.js'

function Login(props) {
  return (
    <Wrapper>
      <Masthead height="100%" padding="4rem 0">
        <LoginForm />
      </Masthead>
    </Wrapper>
  )
}

export default Login
