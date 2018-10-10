import React, {Component} from "react"
import {connect} from "react-redux"

import signup from "../../api/user/actions/signupActions.js"
import styled, {ThemeProvider} from "styled-components"
import Masthead from "../../containers/Mastheads/Masthead"
import Subtitle from "../../components/Text/Subtitle.js"
import SignupForm from "../../containers/Forms/SignupForm.js"
import {addFlashMessage} from "../../app/actions/flashMessages.js"
import {Wrapper} from "../../components"

function Signup(props) {
  const {signupRequest, addFlashMessage} = props

  return (
    <Wrapper>
      <Masthead height="100%" padding="4rem 0">
        <SignupForm
          signupRequest={signupRequest}
          addFlashMessage={addFlashMessage}
          history={props.history}
        />
      </Masthead>
    </Wrapper>
  )
}

export default connect(
  null,
  {signupRequest: signup.request, addFlashMessage}
)(Signup)
