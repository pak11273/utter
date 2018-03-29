import styled from 'styled-components'

const MastheadTitle = styled.div`
  color: ${props => props.color};
  font-family: ${props => props.fontfamily};
  font-size: ${props => props.fontsize};
  font-weight: ${props => props.fontweight};
  padding: ${props => props.padding};
  text-align: ${props => props.textalign} 
  width: ${props => props.width};
`
MastheadTitle.defaultProps = {
  color: '#273e63',
  fontsize: '3rem',
  fontweight: '900',
  padding: '20px',
  width: '100%',
  textalign: 'center'
}

export default MastheadTitle
