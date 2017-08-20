import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import styled, {ThemeProvider} from 'styled-components'
import Wrapper from '../containers/Wrappers/Wrapper.js'
import Masthead from '../containers/Mastheads/Masthead'
import Navbar from '../containers/Navbars/Navbar'
import Title from '../components/Text/Title.js'
import Subtitle from '../components/Text/Subtitle.js'
import Section from '../containers/Sections/Section.js'
import Input from '../components/Inputs/Input.js'

class Languages extends Component {
  render() {
    return (
      <Wrapper>
        <Masthead bg="green">
          <Title>Languages</Title>
          <Subtitle>
            Choose from several languages
          </Subtitle>
          <p>Search for a language</p>
          <Input />
          <button>Search</button>
          <NavLink to="/korean"><h6>Korean</h6></NavLink>
          <h6>Spanish - coming soon</h6>
          <h6>French - coming soon</h6>
        </Masthead>
      </Wrapper>
    )
  }
}

export default Languages
