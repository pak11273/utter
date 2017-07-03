import React, {Component} from 'react'
import styled, {ThemeProvider} from 'styled-components'
import Wrapper from '../containers/Wrappers/Wrapper.js'
import Masthead from '../containers/Mastheads/Masthead'
import Navbar from '../containers/Navbars/Navbar'
import Title from '../components/Text/Title.js'
import Subtitle from '../components/Text/Subtitle.js'

export default () =>
  <Wrapper>
    <Masthead bg="green">
      <Title>Contact us</Title>
      <Subtitle>We are here</Subtitle>
    </Masthead>
  </Wrapper>
