import React, {Component} from 'react'
import styled, {ThemeProvider} from 'styled-components'
import {main, base, anotherOne} from '../themes/config'

import Navbar from '../containers/Navbars/Navbar'
import Masthead from '../containers/Mastheads/Masthead'
import Wrapper from '../containers/Wrappers/Wrapper'
import Title from '../components/Text/Title.js'
import Subtitle from '../components/Text/Subtitle.js'
import CTA from '../components/Buttons/CTA.js'

class Home extends Component {
  render(props) {
    Subtitle.defaultProps = {
      theme: {
        color: 'black'
      }
    }
    Title.defaultProps = {
      theme: {
        color: 'black'
      }
    }
    return (
      <Wrapper>
        <Masthead bg="url('https://previews.123rf.com/images/nyul/nyul1408/nyul140800216/31077944-Corporate-people-chatting-at-business-office-lobby-Standing-gesturing-arms-crossed-arms-on-hip-confi-Stock-Photo.jpg') no-repeat center top">
          <ThemeProvider theme={main}>
            <Title>
              Speak another language
            </Title>
          </ThemeProvider>
          <Subtitle>This actually works!</Subtitle>
          <CTA>Subscribe Today</CTA>
        </Masthead>
        <Masthead bg="brown">
          <Title>Who is this for?</Title>
          <Subtitle>Hi therre</Subtitle>
          <ThemeProvider theme={main}>
            <CTA>Subscribe Today</CTA>
          </ThemeProvider>
        </Masthead>
      </Wrapper>
    )
  }
}

export default Home
