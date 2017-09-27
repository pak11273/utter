import React from 'react'
import styled from 'styled-components'

const Table = styled.table`
  border: ${props => props.border};
  color: ${props => props.color};
  display: ${props => props.display};
  font-family: ${props => props.fontfamily};
  font-size: ${props => props.fontsize};
  font-weight: ${props => props.fontweight};
  padding: ${props => props.padding};
  table-layout: ${props => props.tablelayout};
  text-align: ${props => props.textalign}; 
  vertical-align: ${props => props.verticalalign}; 
  width: ${props => props.width};
`
Table.defaultProps = {
  fontsize: '2rem',
  fontweight: '400',
  padding: props => '.5% 5% 0 5%',
  width: '100%',
  textalign: 'left'
}

export default Table
