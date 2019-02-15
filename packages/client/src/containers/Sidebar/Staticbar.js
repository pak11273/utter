import styled from "styled-components"

const StaticSidebar = styled.div`
  background: ${props => props.background};
  display: ${props => props.display};
  flex-direction: ${props => props.flexdirection};
  min-width: ${props => props.minwidth};
  grid-area: ${props => props.gridarea};
  grid-column: ${props => props.gridcolumn};
  grid-row: ${props => props.gridrow};
  grid-template-rows: ${props => props.gridtemplaterows};
  height: ${props => props.height};
  padding: ${props => props.padding};

  @media (min-width: 640px) {
    grid-template-rows: auto;
    height: auto;
  }
`
StaticSidebar.defaultProps = {
  background: "#f3f3f3",
  display: "flex",
  gridarea: "sidebar",
  height: "auto",
  padding: "100px 0 0 0",
  minwidth: "200px"
}

export default StaticSidebar
