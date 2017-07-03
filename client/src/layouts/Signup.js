import React, {Component} from 'react'
import styled, {ThemeProvider} from 'styled-components'
import Wrapper from '../containers/Wrappers/Wrapper.js'
import Masthead from '../containers/Mastheads/Masthead'
import Navbar from '../containers/Navbars/Navbar'
import Title from '../components/Text/Title.js'
import Subtitle from '../components/Text/Subtitle.js'
import SignupForm from '../containers/Forms/SignupForm.js'

class Signup extends Component {
  render() {
    return (
      <Wrapper>
        <Masthead height="100%" bg="green">
          <SignupForm />
        </Masthead>
      </Wrapper>
    )
  }
}

export default Signup
