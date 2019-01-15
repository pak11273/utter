import React from "react"
import {Redirect} from "react-router-dom"
import {connect} from "react-redux"

import ForgotPasswordForm from "../../containers/forms/forgot-password-form.js"
import {addFlashMessage} from "../../app/actions/flashMessages.js"

function forgotPassword({submit, addFlashMessage}) {
  const loggedIn = localStorage.getItem("AUTH_TOKEN")
  if (loggedIn) {
    var redirect = <Redirect to="/" />
  } else {
    redirect = (
      <ForgotPasswordForm addFlashMessage={addFlashMessage} submit={submit} />
    )
  }
  return <React.Fragment>{redirect}</React.Fragment>
}

export default connect(
  null,
  {addFlashMessage}
)(forgotPassword)
