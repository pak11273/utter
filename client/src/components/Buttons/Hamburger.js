import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const Menu = styled.div.attrs({
  margin: props => props.margin || '0 1rem'
})`
  box-sizing: border-box; 
  display: flex;
  margin: ${props => props.margin};
  flex-direction: column;
  justify-content: center;
  @media (min-width: 600px) {
    display: none;
  }
`
const Bar = styled.div.attrs({
  bg: props => props.theme.color || 'white',
  color: props => props.color
})`
  width: 35px; 
  height: 5px;
  margin: 3px 0;
  color: ${props => props.color};
  background: ${props => props.bg};
`
export default () =>
  <a href="">
    <Menu>
      <Bar />
      <Bar />
      <Bar />
    </Menu>
  </a>
