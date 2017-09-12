import React, {Component} from 'react'
import styled, {ThemeProvider} from 'styled-components'
import Wrapper from '../containers/Wrappers/Wrapper.js'
import Masthead from '../containers/Mastheads/Masthead'
import Navbar from '../containers/Navbars/Navbar'
import Title from '../components/Text/Title.js'
import Subtitle from '../components/Text/Subtitle.js'

class Redux extends Component {
  render() {
    console.log('hello :' + props.store)
    return (
      <Wrapper>
        <Masthead bg="green">
          <Title>Redux Playground</Title>
          <Subtitle>Use this layout to learn redux</Subtitle>
        </Masthead>
      </Wrapper>
    )
  }
}

export default Redux
