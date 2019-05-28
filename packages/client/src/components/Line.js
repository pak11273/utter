import styled from "styled-components"

const Line = styled.hr`
  background-color: ${props => props.backgroundcolor};
	border: ${props => props.border};
  color: ${props => props.color};
  height: ${props => props.height};
  margin: ${props => props.margin};
  position: ${props => props.position};
  top: ${props => props.top};
  right: ${props => props.right};
  bottom: ${props => props.bottom};
  left: ${props => props.left};
  width: ${props => props.width};
`
Line.defaultProps = {
	border: "none",
  color: "#fff",
  height: "1px"
}

export default Line
