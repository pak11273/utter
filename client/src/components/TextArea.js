import React from 'react'
import styled from 'styled-components'

const TextArea = styled.textarea`
  color: ${props => props.color};
  border: ${props => props.border};
  display: ${props => props.display};
  font-family: ${props => props.fontfamily};
  font-size: ${props => props.fontsize};
  font-weight: ${props => props.fontweight};
  padding: ${props => props.padding};
  resize: ${props => props.resize};
  text-align: ${props => props.textalign};
  width: ${props => props.width};
`
Text.defaultProps = {
  color: props => props.theme.color,
  display: 'block',
  fontsize: '1rem',
  fontfamily: 'Arial',
  textalign: 'left'
}

export default TextArea
