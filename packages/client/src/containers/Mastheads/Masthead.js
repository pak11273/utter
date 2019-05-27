import styled from "styled-components"

const Masthead = styled.div`
  align-items: ${props => props.alignitems};
  background: ${props => props.background};
  background-size: ${props => props.backgroundsize};
  box-sizing: ${props => props.borderbox};
  display: ${props => props.display};
  flex-direction: ${props => props.flexdirection};
  grid-area: ${props => props.gridarea};
  height: ${props => props.height};
  justify-content: ${props => props.justifycontent};
  margin: ${props => props.margin};
  max-width: ${props => props.maxwidth};
  overflow: hidden;
  padding: ${props => props.padding};
  position: relative;
  text-align: ${props => props.textalign};
  width: ${props => props.width};
`
Masthead.defaultProps = {
  alignitems: "center",
  background: "white",
  boxsizing: "border-box",
  display: "flex",
  flexdirection: "column",
  height: "100%",
  margin: "0 auto",
  padding: "100px 20px 100px 20px",
  justifycontent: "flex-start",
  textalign: "center",
  width: "100%"
}

export default Masthead
