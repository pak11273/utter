import React, {Component} from 'react'
import {NavLink, Route} from 'react-router-dom'
import styled, {ThemeProvider} from 'styled-components'
import {Masthead, Navbar} from '../containers'
import {
  Box,
  Column,
  Section,
  Subtitle,
  Text,
  Title,
  Wrapper
} from '../components'

const Profile = () => <div>profile</div>
const Settings = () => <div>settings</div>

export default () =>
  <Wrapper>
    <Title>Settings</Title>
    <Section gridtemplatecolumns="1fr 2fr">
      <Column>
        <NavLink
          style={{fontSize: '2rem', padding: '20px'}}
          to="/settings/profile">
          <h6>Profile</h6>
        </NavLink>
        <NavLink
          style={{fontSize: '2rem', padding: '20px'}}
          to="/settings/settings">
          <h6>Billiing</h6>
        </NavLink>
        <NavLink style={{fontSize: '2rem', padding: '20px'}} to="/dashboard">
          <h6>Dashboard</h6>
        </NavLink>
      </Column>
      <Column>
        <Box flexdirection="row" justifycontent="center">
          <Route path="/settings/profile" component={Profile}>
            <Text color="black" fontsize="2rem" />
          </Route>
          <Route path="/settings/settings" component={Settings}>
            <Text color="black" fontsize="2rem" />
          </Route>
        </Box>
      </Column>
    </Section>
  </Wrapper>
