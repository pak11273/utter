import React from 'react'
import styled from 'styled-components'

const Content = styled.div`
  display: flex;
  padding: 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: Papaywhip;
  background: url("https://previews.123rf.com/images/nyul/nyul1408/nyul140800216/31077944-Corporate-people-chatting-at-business-office-lobby-Standing-gesturing-arms-crossed-arms-on-hip-confi-Stock-Photo.jpg");
  background-size: cover;
  height: 600px;
  h1,h4,h6 {
    text-shadow: 5px 5px #333;
  }
`
const MastheadRegView = ({title, subtitle, caption}) =>
  <Content>
    <h1>{title}</h1>
    <h4>{subtitle}</h4>
    <h6>{caption}</h6>
  </Content>

export default MastheadRegView
