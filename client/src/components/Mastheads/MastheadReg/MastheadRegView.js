import React from 'react'
import styled from 'styled-components'

const Frame = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  background: url(${props => props.src}) no-repeat center top;
  height: 500px;
  min-width: 1024px;
  width: 100vw;
  background-size: cover;
`
const Content = styled.div`
  position: absolute;
  top: ${props => (props.top ? props => props.top : '5rem')};
  text-align: ${props => props.align};
  p {
    color: #000;
    font-weight: 900;
  }
  h5 {
    font-weight: 800;
    color: #000;
    text-shadow: 3px 3px #fff;
  }
  h6 {
    font-weight: 600;
    color: brown;
    text-shadow: 2px 2px #fff;
    padding-bottom: 1rem;
  }
`
const CTA = styled.button`
  color: white;
  border: 1px solid green;
  border-radius: 1rem;
  background: #00bcd4;
  font-size: 2rem;
  font-weight: 600;
  width: 200px;
  height: 40xp;
  padding: 1rem;
  margin: 3rem;
`

const MastheadRegView = ({top, title, subtitle, caption, align, src}) =>
  <Frame src={src}>
    <Content align={align} top={top}>
      <h5>{title}</h5>
      <h6>{subtitle}</h6>
      <p><b>{caption}</b></p>
      <CTA>Free Trial</CTA>
    </Content>
  </Frame>

export default MastheadRegView
