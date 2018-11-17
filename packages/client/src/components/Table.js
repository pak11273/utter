import styled from 'styled-components'

const Table = styled.table`
  border: ${props => props.border};
  color: ${props => props.color};
  display: ${props => props.display};
  font-family: ${props => props.fontfamily};
  font-size: ${props => props.fontsize};
  font-weight: ${props => props.fontweight};
  overflow: ${props => props.overflow};
  min-width: ${props => props.minwidth};
  padding: ${props => props.padding};
  table-layout: ${props => props.tablelayout};
  text-align: ${props => props.textalign}; 
  vertical-align: ${props => props.verticalalign}; 
  white-space: ${props => props.whitespace};
  width: ${props => props.width};
`
Table.defaultProps = {
  fontsize: '2rem',
  fontweight: '400',
  overflow: 'auto',
  padding: props => '.5% 5% 0 5%',
  tablelayout: 'fixed',
  textalign: 'left',
  width: '100%'
}

export default Table
