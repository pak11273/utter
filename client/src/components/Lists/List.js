import styled from 'styled-components'

const List = styled.ol`
  color: ${props => props.color};
  display: ${props => props.display};
  font-family: ${props => props.fontfamily};
  font-size: ${props => props.fontsize};
  font-weight: ${props => props.fontweight};
  list-style-type: ${props => props.liststyletype};
  padding: ${props => props.padding};
  width: ${props => props.width};
`
List.defaultProps = {
  display: 'block',
  liststyletype: 'disc'
}

export default List
