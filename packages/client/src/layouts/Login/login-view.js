import React from "react"
import {Redirect} from "react-router-dom"
import {connect} from "react-redux"

import LoginForm from "./login-form"
import {addFlashMessage} from "../../core/actions/flashMessages.js"

function Login({submit, addFlashMessage}) {
  const loggedIn = localStorage.getItem("AUTH_TOKEN")
  if (loggedIn) {
    var redirect = <Redirect to="/" />
  } else {
    redirect = <LoginForm addFlashMessage={addFlashMessage} submit={submit} />
  }
  return <React.Fragment>{redirect}</React.Fragment>
}

export default connect(
  null,
  {addFlashMessage}
)(Login)
