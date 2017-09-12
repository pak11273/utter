import React, {Component} from 'react'
import styled from 'styled-components'

const Line = styled.hr`
  color: ${props => props.color};
  height: ${props => props.height};
  margin: ${props => props.margin};
  width: ${props => props.width}; 
`
Line.defaultProps = {
  color: '#fff',
  height: '4px',
  margin: '30px',
  width: '300px'
}

export default Line
