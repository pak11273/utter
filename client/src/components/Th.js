import styled from 'styled-components'

const Th = styled.th`
  border: ${props => props.border};
  border-bottom: ${props => props.borderbottom};
  color: ${props => props.color};
  display: ${props => props.display};
  font-family: ${props => props.fontfamily};
  font-size: ${props => props.fontsize};
  font-weight: ${props => props.fontweight};
  padding: ${props => props.padding};
  align: ${props => props.align};
  width: ${props => props.width};
`
Th.defaultProps = {
  borderbottom: '1px solid black',
  fontsize: '1rem',
  fontweight: 'bold',
  padding: '20px',
  textalign: 'left'
}

export default Th
