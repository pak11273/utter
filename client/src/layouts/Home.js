import React, {Component} from 'react'
import styled from 'styled-components'
import Wrapper from '../containers/Wrappers/Wrapper'
import Masthead from '../containers/Mastheads/Masthead'
import Title from '../components/Text/Title.js'
import Subtitle from '../components/Text/Subtitle.js'
import CTA from '../components/Buttons/CTA.js'

class Home extends Component {
  render(props) {
    return (
      <Wrapper>
        <Masthead background="url('https://previews.123rf.com/images/nyul/nyul1408/nyul140800216/31077944-Corporate-people-chatting-at-business-office-lobby-Standing-gesturing-arms-crossed-arms-on-hip-confi-Stock-Photo.jpg') no-repeat center top">
          <Title>
            Speak another language
          </Title>
          <Subtitle>This actually works!</Subtitle>
          <CTA color="black">Subscribe Today</CTA>
        </Masthead>
      </Wrapper>
    )
  }
}

export default Home
