import styled from 'styled-components'
import {Button} from '../../components'

const Dropdown = styled.button`
  background: ${props => props.background};
  border: ${props => props.border};
  font-size: ${props => props.fontsize};
  outline: ${props => props.outline};
  text-align: ${props => props.textalign};
`
Dropdown.defaultProps = {
  background: 'transparent',
  border: 'none',
  fontsize: '1.2rem',
  outline: 'none',
  textalign: 'left'
}

export default Dropdown
