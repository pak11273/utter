import React from "react"
import {Redirect} from "react-router-dom"
import {connect} from "react-redux"

import login from "../../api/user/actions/login-actions.js"
import LoginForm from "../../containers/Forms/login-form"
import {addFlashMessage} from "../../app/actions/flashMessages.js"

function Login({submit, history, loginRequest, addFlashMessage}) {
  const loggedIn = localStorage.getItem("AUTH_TOKEN")
  if (loggedIn) {
    var redirect = <Redirect to="/" />
  } else {
    redirect = (
      <LoginForm
        loginRequest={loginRequest}
        addFlashMessage={addFlashMessage}
        history={history}
        submit={submit}
      />
    )
  }
  return <React.Fragment>{redirect}</React.Fragment>
}

export default connect(
  null,
  {loginRequest: login.request, addFlashMessage}
)(Login)
