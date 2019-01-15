import React from "react"
import {connect} from "react-redux"

import SignupForm from "../../containers/forms/signup-form.js"
import {addFlashMessage} from "../../app/actions/flashMessages.js"

function Signup({submit, signupRequest, addFlashMessage}) {
  return (
    <SignupForm
      signupRequest={signupRequest}
      addFlashMessage={addFlashMessage}
      submit={submit}
    />
  )
}

export default connect(
  null,
  {addFlashMessage}
)(Signup)
