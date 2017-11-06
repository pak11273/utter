import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import styled, {ThemeProvider} from 'styled-components'
import Wrapper from '../../containers/Wrappers/Wrapper.js'
import Masthead from '../../containers/Mastheads/Masthead'
import Navbar from '../../containers/Navbars/Navbar'
import Title from '../../components/Text/Title.js'
import Subtitle from '../../components/Text/Subtitle.js'

class Korean extends Component {
  render() {
    return (
      <Wrapper>
        <Masthead bg="green">
          <Title>Korean</Title>
          <Subtitle>
            Hangul for the simple minded for:
          </Subtitle>
          <select>
            <option>English Speakers</option>
            <option>French Speakers</option>
            <option>Spanish Speakers</option>
          </select>
          <button><NavLink to="/korean/1">Submit</NavLink></button>
        </Masthead>
      </Wrapper>
    )
  }
}

export default Korean
