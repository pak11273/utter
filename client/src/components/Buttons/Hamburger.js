import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const Menu = styled.div`
  box-sizing: border-box; 
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: ${props => props.margin};

  @media (min-width: 600px) {
    display: none;
  }
`

Menu.defaultProps = {
  margin: '0 1rem'
}

const Bar = styled.div`
  background: ${props => props.background};
  color: ${props => props.color};
  height: 5px;
  margin: 3px 0;
  width: 35px; 
`
Bar.defaultProps = {
  background: 'white',
  color: 'white'
}

export default () =>
  <a href="">
    <Menu>
      <Bar />
      <Bar />
      <Bar />
    </Menu>
  </a>
