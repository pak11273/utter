import React from 'react'
import styled from 'styled-components'

const Text = styled.div`
  color: ${props => props.color};
  font-family: ${props => props.fontfamily};
  font-size: ${props => props.fontsize};
  font-weight: ${props => props.fontweight};
  padding: ${props => props.padding};
  text-align: ${props => props.textalign} 
  width: ${props => props.width};
`
Text.defaultProps = {
  color: props => props.theme.color,
  fontsize: '1rem',
  fontfamily: 'Arial'
}

export default Text
