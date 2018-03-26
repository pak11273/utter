import styled from 'styled-components'

const Td = styled.td`
  border: ${props => props.border};
  color: ${props => props.color};
  display: ${props => props.display};
  font-family: ${props => props.fontfamily};
  font-size: ${props => props.fontsize};
  font-weight: ${props => props.fontweight};
  padding: ${props => props.padding};
  text-align: ${props => props.textalign};
  vertical-align: ${props => props.verticalalign};
  width: ${props => props.width};
`
Td.defaultProps = {
  fontsize: '1.2rem',
  fontweight: '400',
  padding: props => '.5% 5% 0 2%',
  width: '100%',
  textalign: 'left',
  verticalalign: 'middle'
}

export default Td
