import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import styled, {ThemeProvider} from 'styled-components'

import {
  Box,
  List,
  ListItem,
  Section,
  Subtitle,
  Title,
  Wrapper
} from '../components'

const Li = styled(ListItem)`
  list-style-type: none;

  & a {
    font-size: 2rem;
  }
`

export default () =>
  <Wrapper>
    <Section>
      <Subtitle>Subscriptions</Subtitle>{' '}
    </Section>
    <Section gridtemplatecolumns="1fr 1fr 1fr" alignitems="flex-start">
      <Box>
        <List fontsize="2rem">
          <Li><NavLink to="/korean/1">Korean Level 1</NavLink></Li>
          <Li><NavLink to="/korean/2">Korean Level 2</NavLink></Li>
          <Li><NavLink to="/korean/3">Korean Level 3</NavLink></Li>
          <Li><NavLink to="/korean/4">Korean Level 4</NavLink></Li>
          <Li><NavLink to="/korean/5">Korean Level 5</NavLink></Li>
          <Li><NavLink to="/korean/6">Korean Level 6</NavLink></Li>
          <Li><NavLink to="/korean/7">Korean Level 7</NavLink></Li>
          <Li><NavLink to="/korean/8">Korean Level 8</NavLink></Li>
        </List>
      </Box>
      <Box>
        <List>
          <Li>
            <NavLink to="/spanish/1">Spanish Level 1</NavLink>
          </Li>
          <Li>
            <NavLink to="/spanish/2">Spanish Level 2</NavLink>
          </Li>
          <Li>
            <NavLink to="/spanish/3">Spanish Level 3</NavLink>
          </Li>
        </List>
      </Box>
      <Box>
        <List>
          <Li>
            <NavLink to="/french/1">French Level 1</NavLink>
          </Li>
          <Li>
            <NavLink to="/french/2">French Level 2</NavLink>
          </Li>
        </List>
      </Box>
    </Section>
  </Wrapper>
