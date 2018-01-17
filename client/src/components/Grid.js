import React, {Component} from 'react'
import styled from 'styled-components'

const Grid = styled.section`
  align-items: ${props => props.alignitems};
  display: ${props => props.display};
  grid-auto-rows: ${props => props.gridautorows};
  grid-column-gap: ${props => props.gridcolumngap};
  grid-column: ${props => props.gridcolumn};
  grid-gap: ${props => props.gridgap};
  grid-row: ${props => props.gridrow};
  grid-template-columns: ${props => props.gridtemplatecolumns};
  grid-template-rows: ${props => props.gridtemplaterows};
  height: ${props => props.height};
  overflow-x: ${props => props.overflowx};
  overflow-y: ${props => props.overflowy};
  position: ${props => props.position};

  @media(min-width: 640px) {
    grid-template-columns: ${props => props.gridtemplatecolumns640};
  }
`

Grid.defaultProps = {
  display: 'grid',
  overflowx: 'hidden',
  overflowy: 'hidden'
}

export default Grid
