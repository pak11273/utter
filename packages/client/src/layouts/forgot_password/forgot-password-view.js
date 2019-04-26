import React from "react"
import {Redirect} from "react-router-dom"
import {cookies} from "brownies"

import ForgotPasswordForm from "../../containers/forms/forgot-password-form.js"

function forgotPassword({submit}) {
  const loggedIn = cookies._uid
  if (loggedIn) {
    var redirect = <Redirect to="/" />
  } else {
    redirect = <ForgotPasswordForm submit={submit} />
  }
  return <React.Fragment>{redirect}</React.Fragment>
}

export default forgotPassword
