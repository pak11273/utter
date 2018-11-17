import styled from 'styled-components'

const Thead = styled.thead`
  border: ${props => props.border};
  color: ${props => props.color};
  display: ${props => props.display};
  font-family: ${props => props.fontfamily};
  font-size: ${props => props.fontsize};
  font-weight: ${props => props.fontweight};
  padding: ${props => props.padding};
  text-align: ${props => props.textalign} 
  width: ${props => props.width};
`
Thead.defaultProps = {
  fontsize: '2rem',
  fontweight: '400',
  padding: props => '.5% 5% 0 5%',
  width: '100%',
  textalign: 'left'
}

export default Thead
