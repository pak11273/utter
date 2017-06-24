import React from 'react'
import styled from 'styled-components'

const Content = styled.div`
  //background declarations must be last
  box-sizing: border-box;
  background: url(${props => props.src}) no-repeat center center;
  background-size: cover;
  background-attachment: ${props => (props.parallax ? 'fixed' : 'none')};
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: ${props => props.align};
  h3 {
    padding-bottom: 3rem;
  }
  padding: 15rem;
`
const FooterRegView = ({title, info, cta, src, parallax, align}) =>
  <Content src={src} parallax={parallax} align={align}>
    <h3>{title}</h3>
    <h4>{info}</h4>
    <h5>{cta}</h5>
  </Content>

export default FooterRegView
