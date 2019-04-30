import styled from "styled-components"

const Link = styled.a`
  color: ${props => props.color};
  cursor: ${props => props.cursor};
  display: ${props => props.display};
  font-family: ${props => props.fontfamily};
  font-size: ${props => props.fontsize};
  font-weight: ${props => props.fontweight};
  line-height: ${props => props.lineheight};
  margin: ${props => props.margin};
  padding: ${props => props.padding};
  text-align: ${props => props.textalign};
  width: ${props => props.width};
`

export default Link
