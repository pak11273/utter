import styled from "styled-components"

const NavbarSpacer = styled.div`
  display: ${props => props.display};
  margin: ${props => props.margin};
  @media (min-width: 640px) {
    margin: 0px 0 0 0;
  }
`

export default NavbarSpacer
