import { Component } from 'react';
import styled from 'styled-components'

const Spacer = styled.div`
  display: ${props => props.display};
  margin: ${props => props.margin};
`

export default Spacer
