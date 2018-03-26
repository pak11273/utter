import styled from 'styled-components'

const Tr = styled.tr`
  border: ${props => props.border};
  border-bottom: ${props => props.borderbottom};
  color: ${props => props.color};
  display: ${props => props.display};
  font-family: ${props => props.fontfamily};
  font-size: ${props => props.fontsize};
  font-weight: ${props => props.fontweight};
  height: ${props => props.height};
  padding: ${props => props.padding};
  position: ${props => props.position};
  text-align: ${props => props.textalign} 
  width: ${props => props.width};
`
Tr.defaultProps = {
  width: '100%',
  textalign: 'left'
}

export default Tr
