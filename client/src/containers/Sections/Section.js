import React, {Component} from 'react'
import styled from 'styled-components'

const Frame = styled.div.attrs({
  color: props => props.color || 'black',
  bg: props => props.bg || 'white'
})`
    box-sizing: border-box;
    display: flex;
    width: 100vw;
    justify-content: center;
    background: url(${props => props.src}) no-repeat;
    background-color: ${props => props.bg};
    background-size: cover;
    padding: 1%;
    li {
      font-size: 3rem;
    }
    @media(min-width: 465px) {
      padding: 5%;
    }
  `

const Col = styled.div.attrs({
  size: props => props.size || '2rem'
})`
  font-size: ${props => props.size};
  padding: ${props => props.colPadding};
  box-sizing: border-box;
  display: flex;
  flex-direction: ${props => props.dir};
  align-items: ${props => props.align};
  width: ${props => props.col};
`

export default props =>
  <Frame src={props.src} bg={props.bg} color={props.color}>
    <Col
      size={props.size}
      dir={props.dir}
      col={props.col}
      align={props.align}
      colPadding={props.colPadding}>
      {props.info}
      {props.children}
    </Col>
  </Frame>
