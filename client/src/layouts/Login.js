import React, {Component} from 'react'
import styled, {ThemeProvider} from 'styled-components'
import Wrapper from '../containers/Wrappers/Wrapper.js'
import Masthead from '../containers/Mastheads/Masthead'
import Navbar from '../containers/Navbars/Navbar'
import Title from '../components/Text/Title.js'
import Subtitle from '../components/Text/Subtitle.js'
import LoginForm from '../containers/Forms/LoginForm.js'

class Login extends Component {
  render() {
    return (
      <Wrapper>
        <Masthead height="100%" padding="4rem 0">
          <LoginForm history={this.props.history} />
        </Masthead>
      </Wrapper>
    )
  }
}

export default Login
