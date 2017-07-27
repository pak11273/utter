import React, {Component} from 'react'
import {NavLink, Link} from 'react-router-dom'
import styled from 'styled-components'
import Graphic from '../../assets/images/logo.png'

const Logo = styled(NavLink)`
  background-image: url(${Graphic}),
  color: ${props => props.color};
  font-size: 2rem;
  height: ${props => props.height}; 
  padding: 0rem;
  width: ${props => props.width}; 
`
Logo.defaultProps = {
  width: '50px',
  height: '50px'
}

export default Logo
