import React, {Component} from "react"
import {connect} from "react-redux"
import styled, {ThemeProvider} from "styled-components"
import {Redirect} from "react-router-dom"

import {Masthead} from "../../containers"
import {Wrapper} from "../../components"
import LoginForm from "./containers/LoginForm.js"

class Login extends Component {
  constructor(props) {
    super(props)
  }

  render(props) {
    // ref: https://github.com/sotojuan/saga-login-flow
    const loggedIn = localStorage.getItem("AUTH_TOKEN")
    if (loggedIn) {
      var redirect = <Redirect to={"/"} />
    } else {
      var redirect = <LoginForm />
    }
    return (
      <Wrapper>
        <Masthead height="100%" padding="4rem 0">
          {redirect}
        </Masthead>
      </Wrapper>
    )
  }
}

export default connect()(Login)
