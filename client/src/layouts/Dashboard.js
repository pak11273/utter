import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import styled, {ThemeProvider} from 'styled-components'

import {Column, Img, Ol, Section, Subtitle, Title, Wrapper} from '../components'

export default () =>
  <Wrapper>
    <Section flexdirection="column">
      <Subtitle>Subscriptions</Subtitle>{' '}
      <Column flexdirection768="row" alignitems="baseline">
        <Column>
          <Ol fontsize="3rem">
            <li><NavLink to="/korean/1">Korean Level 1</NavLink></li>
            <li><NavLink to="/korean/2">Korean Level 2</NavLink></li>
            <li><NavLink to="/korean/3">Korean Level 3</NavLink></li>
            <li><NavLink to="/korean/4">Korean Level 4</NavLink></li>
            <li><NavLink to="/korean/5">Korean Level 5</NavLink></li>
            <li><NavLink to="/korean/6">Korean Level 6</NavLink></li>
            <li><NavLink to="/korean/7">Korean Level 7</NavLink></li>
            <li><NavLink to="/korean/8">Korean Level 8</NavLink></li>
          </Ol>
        </Column>
        <Column>
          <Ol fontsize="3rem">
            <li><NavLink to="/spanish/1">Spanish Level 1</NavLink></li>
            <li><NavLink to="/spanish/2">Spanish Level 2</NavLink></li>
          </Ol>
        </Column>
      </Column>
    </Section>
  </Wrapper>
