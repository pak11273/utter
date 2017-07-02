import React, {Component} from 'react'
import styled, {ThemeProvider} from 'styled-components'
import Wrapper from '../containers/Wrappers/Wrapper.js'
import Masthead from '../containers/Mastheads/Masthead'
import Navbar from '../containers/Navbars/Navbar'
import Title from '../components/Text/Title.js'
import Subtitle from '../components/Text/Subtitle.js'

class About extends Component {
  render() {
    return (
      <Wrapper>
        <Navbar list={['home', 'about', 'contact']} />
        <Masthead bg="green">
          <Title>Login</Title>
        </Masthead>
      </Wrapper>
    )
  }
}

export default About
