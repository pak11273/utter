import React from "react"

import SignupForm from "../../containers/forms/signup-form.js"

function Signup({submit, signupRequest}) {
  return <SignupForm signupRequest={signupRequest} submit={submit} />
}

export default Signup
