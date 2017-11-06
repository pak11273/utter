import React from 'react'
import styled from 'styled-components'

const Text = styled.div`
  color: ${props => props.color};
  display: ${props => props.display};
  font-family: ${props => props.fontfamily};
  font-size: ${props => props.fontsize};
  font-weight: ${props => props.fontweight};
  padding: ${props => props.padding};
  text-align: ${props => props.textalign} 
  width: ${props => props.width};
`
Text.defaultProps = {
  display: 'block',
  fontsize: '1rem',
  fontfamily: 'Arial',
  textalign: 'left'
}

export default Text