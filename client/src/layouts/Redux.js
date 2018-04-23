import React, {Component} from 'react'
import styled, {ThemeProvider} from 'styled-components'
import {Masthead, Navbar, Wrapper} from '../containers'
import {Subtitle, Title} from '../components'

function Redux(props) {
  return (
    <Wrapper>
      <Masthead bg="green">
        <Title>Redux Playground</Title>
        <Subtitle>Use this layout to learn redux</Subtitle>
      </Masthead>
    </Wrapper>
  )
}

export default Redux
