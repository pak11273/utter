import React, {Component} from 'react'
import styled from 'styled-components'

const Button = styled.button`
  background-color: ${props => props.backgroundcolor};
  border: ${props => props.border};
  border-radius: ${props => props.borderradius};
  color: ${props => props.color},
  cursor: ${props => props.cursor};
  font-size: ${props => props.fontsize};
  font-weight: ${props => props.fontweight};
  height: ${props => props.height};
  margin: ${props => props.margin};
  outline: ${props => props.outline};
  padding: ${props => props.padding};
  position: ${props => props.position};
  width: ${props => props.width};

`

Button.defaultProps = {
  alignitems: 'flex-start',
  backgroundcolor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  outline: 'none'
}

const Img = styled.img`
  alt: ${props => props.alt};
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

  &:hover {
    background: 'red'
  }

`
Img.defaultProps = {
  background: 'black',
  backgroundsize: 'cover',
  cursor: 'pointer',
  display: 'inline',
  height: '40px',
  margin: '0',
  padding: '0',
  verticalalign: 'middle',
  width: '30px'
}

const PlayButton = props =>
  <Button {...props}>
    <Img {...props} />
  </Button>

export default PlayButton
