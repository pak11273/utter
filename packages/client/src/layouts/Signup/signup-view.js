import React from "react"
import {connect} from "react-redux"

import signup from "../../api/user/actions/signupActions.js"
import SignupForm from "../../containers/Forms/signup-form.js"
import {addFlashMessage} from "../../app/actions/flashMessages.js"

function Signup({submit, history, signupRequest, addFlashMessage}) {
  console.log("submit: ", submit)
  return (
    <SignupForm
      signupRequest={signupRequest}
      addFlashMessage={addFlashMessage}
      history={history}
      submit={submit}
    />
  )
}

export default connect(
  null,
  {signupRequest: signup.request, addFlashMessage}
)(Signup)
