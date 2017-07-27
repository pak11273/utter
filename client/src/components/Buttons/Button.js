import React, {Component} from 'react'
import styled from 'styled-components'

const Button = styled.button`
  border-radius: ${props => props.radius};
  color: ${props => props.color};
  font-size: ${props => props.fontsize};
  font-weight: ${props => props.fontweight};
  width: ${props => props.width};
  height: ${props => props.height};
  padding: ${props => props.padding};
  margin: ${props => props.margin};
  background: ${props => props.bg};
  border: '2px solid' + ${props => props.theme.color};
`

Button.defaultProps = {
  borderradius: '.2rem',
  color: props => props.theme.color,
  fontsize: '2rem',
  fontweight: '600',
  height: '3rem',
  padding: '.3em 2rem 3rem 2rem',
  margin: '2rem auto',
  bg: props => props.theme.color
}

export default Button
