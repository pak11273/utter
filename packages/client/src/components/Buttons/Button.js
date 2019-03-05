import {Component} from "react"
import styled from "styled-components"

const Button = styled.button`
  align-self: ${props => props.alignself};
  background: ${props => props.background};
  border: ${props => props.border};
  border-radius: ${props => props.borderradius};
  color: ${props => props.color};
  cursor: ${props => props.cursor};
  font-size: ${props => props.fontsize};
  font-weight: ${props => props.fontweight};
  height: ${props => props.height};
  &:hover {
    color: ${props => props.hovercolor};
    background: ${props => props.hoverbackground};
  }
  outline: ${props => props.outline};
  margin: ${props => props.margin};
  padding: ${props => props.padding};
  text-align: ${props => props.textalign};
  width: ${props => props.width};
`

Button.defaultProps = {
  background: props => props.theme.color,
  color: "black",
  cursor: "pointer"
}

export default Button
