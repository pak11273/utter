import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import styled, {ThemeProvider} from 'styled-components'

import {
  Column,
  Img,
  Masthead,
  Section,
  Subtitle,
  Title,
  Wrapper
} from '../components'
import Navbar from '../containers/Navbars/Navbar'

export default () =>
  <Wrapper>
    <Masthead bg="green" height="100%">
      <Title padding="20px">Dashboard</Title>
    </Masthead>
    <Section
      alignitems="flex-start"
      flexdirection960="row"
      height="175px"
      maxwidth="960px"
      padding="30px"
      textalign="left">
      <Column>
        <Column>
          <Subtitle>Subscriptions</Subtitle>
          <ol>
            <li><NavLink to="/korean/1">Korean Level 1</NavLink></li>
            <li><NavLink to="/korean/2">Korean Level 2</NavLink></li>
            <li><NavLink to="/korean/3">Korean Level 3</NavLink></li>
            <li><NavLink to="/korean/4">Korean Level 4</NavLink></li>
          </ol>
        </Column>
      </Column>
    </Section>
    <Section
      alignitems="flex-start"
      flexdirection960="row"
      height="975px"
      height960="900px"
      maxwidth="960px"
      padding="30px"
      textalign="left">
      <Img
        height="700px"
        width="960px"
        src="https://camo.githubusercontent.com/a9711baa7a193c03a65272e2263c06ab2fad5d28/687474703a2f2f6e6f64657265642e6f72672f696d616765732f64617368626f617264652e706e67"
      />
    </Section>
  </Wrapper>
