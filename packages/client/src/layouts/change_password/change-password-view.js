import React from "react"

import ChangePasswordForm from "./change-password-form.js"

function changePassword(props) {
  const {token, submit} = props
  return (
    <React.Fragment>
      <ChangePasswordForm submit={submit} token={token} />
    </React.Fragment>
  )
}

export default changePassword
