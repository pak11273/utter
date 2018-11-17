import styled from 'styled-components'

const Input = styled.input`
  border: ${props => props.border};
  color: ${props => props.color};
  padding: ${props => props.padding};
  font-family: ${props => props.fontfamily};
  font-size: ${props => props.fontsize};
  font-weight: ${props => props.fontweight};
  height: ${props => props.height};
  margin: ${props => props.margin};
  min-width: ${props => props.minwidth};
  text-align: ${props => props.textalign};
  width: ${props => props.width};
`
Input.defaultProps = {
  fontsize: '1rem',
  fontweight: '100',
  fontfamily: 'Arial',
  padding: '2px 2px 2px 10px',
  textalign: 'left',
  height: '2rem',
  margin: '10px auto'
}

export default Input
