import {Component} from "react"
import styled from "styled-components"

const ButtonBrowse = styled.button`
  background: ${props => (props.primary ? "red" : "yellow")};
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

ButtonBrowse.defaultProps = {
  color: "black",
  cursor: "pointer",
  fontsize: "1.4rem",
  fontweight: "500",
  height: "40px",
  width: "140px"
}

export default ButtonBrowse
