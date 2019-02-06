import styled from "styled-components"

const NavbarSpacer = styled.div`
  display: ${props => props.display};
  height: ${props => props.height};
  margin: ${props => props.margin};
  position: ${props => props.position};
  width: ${props => props.width};
  @media (min-width: 640px) {
    margin: 0px 0 0 0;
  }
`
NavbarSpacer.defaultProps = {
  height: "64px"
}

export default NavbarSpacer
