import styled from 'styled-components'

const MastheadSubtitle = styled.div`
  color: ${props => props.color};
  font-family: ${props => props.fontfamily};
  font-size: ${props => props.fontsize};
  font-weight: ${props => props.fontweight};
  line-height: ${props => props.lineheight};
	max-width: ${props => props.maxwidth};
  padding: ${props => props.padding};
  text-align: ${props => props.textalign}; 
  width: ${props => props.width};
`
MastheadSubtitle.defaultProps = {
  color: '#273e63',
  fontsize: '1.5rem',
  fontweight: '600',
  lineheight: '2.4rem',
  padding: '20px',
  width: '100%',
  textalign: 'left'
}

export default MastheadSubtitle
