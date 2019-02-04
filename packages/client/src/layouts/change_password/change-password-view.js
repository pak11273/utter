import React from "react"
import {connect} from "react-redux"

import ChangePasswordForm from "./change-password-form.js"
import {addFlashMessage} from "../../core/actions/flashMessages.js"

function changePassword(props) {
  const {token, submit, addFlashMessage} = props
  return (
    <React.Fragment>
      <ChangePasswordForm
        addFlashMessage={addFlashMessage}
        submit={submit}
        token={token}
      />
    </React.Fragment>
  )
}

export default connect(
  null,
  {addFlashMessage}
)(changePassword)
