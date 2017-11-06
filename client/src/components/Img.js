import React, {Component} from 'react'
import styled from 'styled-components'

const Img = styled.img`
  alt: ${props => props.alt};
  background: 'black';
  background-size: ${props => props.backgroundsize};
  border-radius: ${props => props.radius};
  bottom: ${props => props.bottom};
  cursor: ${props => props.cursor};
  display: ${props => props.display};
  height: ${props => props.height};
  left: ${props => props.left};
  margin: ${props => props.margin};
  padding: ${props => props.padding};
  position: ${props => props.position};
  right: {props => props.right};
  src: url(${props => props.src});
  top: ${props => props.top};
  vertical-align: ${props => props.verticalalign};
  width: ${props => props.width};
`
Img.defaultProps = {
  backgroundsize: 'cover',
  height: '300px',
  width: '400px'
}

export default Img