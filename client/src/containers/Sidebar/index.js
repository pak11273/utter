import styled from 'styled-components'

const Sidebar = styled.div`
  background: ${props => props.background};
  display: ${props => props.display};
  flex-direction: ${props => props.flexdirection};
  grid-column: ${props => props.gridcolumn};
  grid-row: ${props => props.gridrow};
  padding: ${props => props.padding};
`

Sidebar.defaultProps = {
  background: 'black',
  display: 'grid',
}

export default Sidebar
