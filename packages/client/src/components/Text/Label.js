import styled from 'styled-components'

const Label = styled.div`
  box-sizing: ${props => props.boxsizing};
  color: ${props => props.color};
  font-family: ${props => props.fontfamily};
  font-size: ${props => props.fontsize};
  font-weight: ${props => props.fontweight};
  margin: ${props => props.margin};
  padding: ${props => props.padding};
  width: ${props => props.width};
  text-align: ${props => props.textalign};
`

Label.defaultProps = {
  boxsizing: 'border-box',
  fontfamily: 'Arial',
  fontsize: '1.2rem',
  fontweight: '400',
  textalign: 'center',
  width: '100%'
}

export default Label
