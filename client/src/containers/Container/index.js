import { Component } from 'react';
import styled from 'styled-components'

const Container = styled.div`
  display: ${props => props.display};
  grid-template-columns: ${props => props.gridtemplatecolumns};
  overflow-x: ${props => props.overflowx};
  overflow-y: ${props => props.overflowy};
`

Container.defaultProps = {
  display: 'grid',
  gridtemplatecolumns: '1fr'
}

export default Container
