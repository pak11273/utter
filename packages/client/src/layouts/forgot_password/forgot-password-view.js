import React from "react"
import {Redirect} from "react-router-dom"
import {local} from "brownies"

import ForgotPasswordForm from "../../containers/forms/forgot-password-form.js"

function forgotPassword({submit}) {
  const loggedIn = local.AUTH_TOKEN
  if (loggedIn) {
    var redirect = <Redirect to="/" />
  } else {
    redirect = <ForgotPasswordForm submit={submit} />
  }
  return <React.Fragment>{redirect}</React.Fragment>
}

export default forgotPassword
