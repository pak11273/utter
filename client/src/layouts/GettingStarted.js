import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import styled, {ThemeProvider} from 'styled-components'
import Wrapper from '../containers/Wrappers/Wrapper.js'
import Masthead from '../containers/Mastheads/Masthead'
import Navbar from '../containers/Navbars/Navbar'
import Title from '../components/Text/Title.js'
import Subtitle from '../components/Text/Subtitle.js'

class GettingStarted extends Component {
  render() {
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
            <li><Link to="/Connections">Start Speaking!</Link></li>
          </ol>
        </Masthead>
      </Wrapper>
    )
  }
}

export default GettingStarted
