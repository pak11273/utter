import React, {Component} from 'react'
import styled from 'styled-components'

const Img = styled.img`
  alt: ${props => props.alt};
  background: 'black';
  background-size: ${props => props.backgroundsize};
  border-radius: ${props => props.radius};
  height: ${props => props.height};
  margin: ${props => props.margin};
  src: url(${props => props.src});
  width: ${props => props.width};
`
Img.defaultProps = {
  backgroundsize: 'cover',
  height: '300px',
  margin: '30px auto',
  width: '400px',
  alt: 'image placeholder'
}

export default Img
