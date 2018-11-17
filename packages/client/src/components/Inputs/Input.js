import styled from 'styled-components'

const Input = styled.input`
  color: ${props => props.color};
  padding: ${props => props.padding};
  font-family: ${props => props.fontfamily};
  font-size: ${props => props.fontsize};
  font-weight: ${props => props.fontweight};
  height: ${props => props.height};
  margin: ${props => props.margin};
  text-align: ${props => props.textalign};
  width: ${props => props.width};
`
Input.defaultProps = {
  color: props => props.theme.color,
  fontsize: '1.5rem',
  fontweight: '100',
  fontfamily: 'Arial',
  padding: '3px 5% 2px 5%',
  width: '200px',
  textalign: 'center',
  height: '2rem',
  margin: '10px auto'
}

export default Input
