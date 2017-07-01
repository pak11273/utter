import React, {Component} from 'react'
import styled from 'styled-components'

export default styled.img.attrs({
  width: props => props.width || '50%'
})`
  margin: 0 auto;
  alt: ${props => props.alt};
  border-radius: ${props => props.radius};
  content: url(${props => props.mediaSrc});
`
