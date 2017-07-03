import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import styled, {ThemeProvider} from 'styled-components'
import Wrapper from '../containers/Wrappers/Wrapper.js'
import Masthead from '../containers/Mastheads/Masthead'
import Navbar from '../containers/Navbars/Navbar'
import Title from '../components/Text/Title.js'
import Subtitle from '../components/Text/Subtitle.js'
import Test2 from '../layouts/Test2.js'

export default ({match}) =>
  <Wrapper>
    <Masthead bg="green">
      <Title>Test 1</Title>
      <Subtitle>Add /test2 to the end of /test1 in the url</Subtitle>
      <Subtitle>
        Note: this cannnot happen if you have an exact patch url
      </Subtitle>
      <Route path={match.url + '/test2'} component={Test2} />
    </Masthead>
  </Wrapper>
