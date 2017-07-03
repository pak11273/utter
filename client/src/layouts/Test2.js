import React, {Component} from 'react'
import styled, {ThemeProvider} from 'styled-components'
import Wrapper from '../containers/Wrappers/Wrapper.js'
import Masthead from '../containers/Mastheads/Masthead'
import Title from '../components/Text/Title.js'
import Subtitle from '../components/Text/Subtitle.js'

class About extends Component {
  render() {
    return (
      <Wrapper>
        <Masthead bg="green">
          <Title>Test 2</Title>
          <Subtitle>We are here</Subtitle>
        </Masthead>
      </Wrapper>
    )
  }
}

export default About
