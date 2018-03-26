import { Component } from 'react';
import styled from 'styled-components'

const Img = styled.img`
  align-self: ${props => props.alignself};
  alt: ${props => props.alt};
  background: 'black';
  background-size: ${props => props.backgroundsize};
  border-radius: ${props => props.radius};
  height: ${props => props.height};
  margin: ${props => props.margin};
  src: url(${props => props.src});
  width: ${props => props.width};
`
Img.defaultProps = {}

export default Img
