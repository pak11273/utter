import React, {Component} from 'react'
import styled from 'styled-components'

const MediaImgView = styled.div.attrs({
  color: props => props.size
})`
  // background: url(${props => props.bg});
  margin: 0 auto;
  height: 500px;
  background-size: cover;
  color: ${props => props.color}
`
export default MediaImgView
