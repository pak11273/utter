import styled from 'styled-components'

const Subtitle = styled.div`
  box-sizing: ${props => props.boxsizing};
  color: ${props => props.color};
  display: ${props => props.display};
  font-family: ${props => props.fontfamily};
  font-size: ${props => props.fontsize};
  font-weight: ${props => props.fontweight};
  padding: ${props => props.padding};
  text-align: ${props => props.textalign};
  width: ${props => props.width};
`
Subtitle.defaultProps = {
  boxsizing: 'border-box',
  fontfamily: 'Arial',
  fontsize: '2rem',
  fontweight: '400',
  padding: '20px',
  width: '100%',
  textalign: 'center'
}

export default Subtitle
