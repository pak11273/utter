import React, {Component} from 'react'
import styled, {ThemeProvider} from 'styled-components'
import {Masthead, Navbar} from '../containers'
import {Subtitle, Title, Wrapper} from '../components'

export default () =>
  <Wrapper>
    <Masthead bg="green">
      <Title>Contact us</Title>
      <Subtitle>We are here</Subtitle>
    </Masthead>
  </Wrapper>
