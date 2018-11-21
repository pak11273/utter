import React from "react"
import {connect} from "react-redux"

import login from "../../api/user/actions/signupActions.js"
import LoginForm from "../../containers/Forms/LoginForm.js"
import {addFlashMessage} from "../../app/actions/flashMessages.js"

function Login({submit, history, loginRequest, addFlashMessage}) {
  return (
    <LoginForm
      loginRequest={loginRequest}
      addFlashMessage={addFlashMessage}
      history={history}
      submit={submit}
    />
  )
}

export default connect(
  null,
  {loginRequest: login.request, addFlashMessage}
)(Login)
