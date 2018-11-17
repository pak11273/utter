import styled from 'styled-components'

const Container = styled.div`
  display: ${props => props.display}; 
  grid-template-columns: ${props => props.gridtemplatecolumns}; 
  margin: ${props => props.margin}; 
  width: ${props => props.width}; 

  @media(min-width: 640px) {
    grid-template-columns: ${props => props.gridtemplatecolumns640}; 
    width: 100%;
  }
`

Container.defaultProps = {
  display: 'grid',
  margin: '0 auto',
  width: '100%',
  width640: '100%'
}

export default Container
