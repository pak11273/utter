import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import styled, {ThemeProvider} from 'styled-components'
import {Masthead, Navbar} from '../containers'
import {Subtitle, Title, Wrapper} from '../components'

function GettingStarted(props) {
  return (
    <Wrapper>
      <Masthead bg="green">
        <Title>Getting Started</Title>
        <Subtitle>
          Let's get on the fast track to speaking a new language
        </Subtitle>
        <ol>
          <li>First go over the syllabus</li>
          <li>Briefly look at vocabulary</li>
          <li>Briefly go over any grammar</li>
          <li>
            <Link to="/Zones">Start Speaking!</Link>
          </li>
        </ol>
      </Masthead>
    </Wrapper>
  )
}

export default GettingStarted
