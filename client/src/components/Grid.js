import React, {Component} from 'react'
import styled from 'styled-components'

const Grid = styled.section`
  display: ${props => props.display};
  grid-auto-rows: ${props => props.gridautorows};
  grid-gap: ${props => props.gridgap};
  grid-template-columns: ${props => props.gridtemplatecolumns};
  grid-template-rows: ${props => props.gridtemplaterows};
`

Grid.defaultProps = {
  display: 'grid',
  gridtemplatecolumns: 'repeat(auto-fill, minmax(352px, 1024px))'
}

export default Grid
