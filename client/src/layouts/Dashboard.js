import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import styled, {ThemeProvider} from 'styled-components'
import Wrapper from '../containers/Wrappers/Wrapper.js'
import Masthead from '../containers/Mastheads/Masthead'
import Navbar from '../containers/Navbars/Navbar'
import Title from '../components/Text/Title.js'
import Subtitle from '../components/Text/Subtitle.js'
import Img from '../components/Medias/Img'

export default () =>
  <Wrapper>
    <Masthead bg="green" height="100%">
      <Title>Dashboard</Title>
      <ol>
        <li><NavLink to="/korean/1">Korean Level 1</NavLink></li>
      </ol>
      <Img
        height="700px"
        width="960px"
        src="https://camo.githubusercontent.com/a9711baa7a193c03a65272e2263c06ab2fad5d28/687474703a2f2f6e6f64657265642e6f72672f696d616765732f64617368626f617264652e706e67"
      />
    </Masthead>
  </Wrapper>
