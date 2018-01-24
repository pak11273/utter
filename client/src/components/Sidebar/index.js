import styled from 'styled-components'

const SideBar = styled.div`
  background: ${props => props.background};
  display: ${props => props.display};
  flex-direction: ${props => props.flexdirection};
  padding: ${props => props.padding};
`

SideBar.defaultProps = {
  background: 'black',
  display: 'flex',
  flexdirection: 'column'
}

export default SideBar
