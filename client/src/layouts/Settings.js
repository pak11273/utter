import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import styled, {ThemeProvider} from 'styled-components'
import {Masthead, Navbar} from '../containers'
import {Subtitle, Text, Title, Wrapper} from '../components'

export default () =>
  <Wrapper>
    <Masthead bg="green">
      <Title>Settings</Title>
      <NavLink style={{fontSize: '2rem', padding: '20px'}} to="#">
        <h6>Profile</h6>
      </NavLink>
      <NavLink style={{fontSize: '2rem', padding: '20px'}} to="/dashboard">
        <h6>Dashboard</h6>
      </NavLink>
    </Masthead>
  </Wrapper>
