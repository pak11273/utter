import { Component } from 'react';
import styled from 'styled-components'

const NavbarSpacer = styled.div`
  display: ${props => props.display};
  margin: ${props => props.margin};
  @media (min-width: 640px) {
    margin: 50px 0 0 0 !important;
  }
`

export default NavbarSpacer
