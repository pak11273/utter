import React, {Component} from 'react'
import styled from 'styled-components'

const Button = styled.button`
  align-self: ${props => props.alignself};
  border-radius: ${props => props.borderradius};
  color: ${props => props.color};
  font-size: ${props => props.fontsize};
  font-weight: ${props => props.fontweight};
  width: ${props => props.width};
  height: ${props => props.height};
  padding: ${props => props.padding};
  margin: ${props => props.margin};
  background: ${props => props.background};
  border: ${props => props.border};
  cursor: ${props => props.cursor};
`

Button.defaultProps = {
  background: props => props.theme.color,
  color: props => props.theme.color,
  cursor: 'pointer'
}

export default Button
