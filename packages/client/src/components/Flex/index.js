import styled from "styled-components"

const Flex = styled.div`
  align-items: ${props => props.alignitems};
  align-self: ${props => props.alignself};
  background: ${props => props.background};
  color: ${props => props.color};
  display: ${props => props.display};
  flex-direction: ${props => props.flexdirection};
  flex-wrap: ${props => props.flexwrap};
  font-size: ${props => props.fontsize};
  grid-area: ${props => props.gridarea};
  height: ${props => props.height};
  justify-content: ${props => props.justifycontent};
  margin: ${props => props.margin};
  min-height: ${props => props.minheight};
  min-width: ${props => props.minwidth};
  max-width: ${props => props.maxwidth};
  padding: ${props => props.padding};
  position: ${props => props.position};
  text-align: ${props => props.textalign};
  width: ${props => props.width};

  @media (min-width: 640px) {
    margin: ${props => props.margin640};
    align-items: ${props => props.alignitems640};
    flex-direction: ${props => props.flexdirection640};
    justify-content: ${props => props.justifycontent640};
    width: ${props => props.width640};
  }

  @media (min-width: 768px) {
    align-items: ${props => props.alignitems768};
    flex-direction: ${props => props.flexdirection768};
    justify-content: ${props => props.justifycontent768};
    padding: ${props => props.padding768};
    width: ${props => props.width768};
  }

  @media (min-width: 960px) {
    align-items: ${props => props.alignitems960};
    flex-direction: ${props => props.flexdirection960};
    justify-content: ${props => props.justifycontent960};
    padding: ${props => props.padding960};
    width: ${props => props.width960};
  }
`
Flex.defaultProps = {
  alignitems: "center",
  background: "transparent",
  display: "flex",
  flexdirection: "column",
  justifycontent: "flex-start",
  overflow: "hidden",
  width: "100%"
}

export default Flex
