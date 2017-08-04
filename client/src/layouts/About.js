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
        <Masthead bg="green">
          <Title>About Us</Title>
          <Subtitle>
            We foster the greatest learning tool you have available
            already-Your brain. Our techniques allow you to naturally
            learn something at the highest level possible. No tricks, no
            gimmicks.
          </Subtitle>
        </Masthead>
      </Wrapper>
    )
  }
}

export default About
