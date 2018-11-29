import React from "react"
import {connect} from "react-redux"

import signup from "../../api/user/actions/signupActions.js"
import SignupForm from "../../containers/Forms/signup-form.js"
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
  {signupRequest: signup.request, addFlashMessage}
)(Signup)
