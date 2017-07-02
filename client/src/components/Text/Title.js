import React from 'react'
import styled from 'styled-components'

export default styled.div.attrs({
  Size: props => props.Size || '4rem',
  Weight: props => props.Weight || '600',
  Color: props => props.Color || props.theme.color,
  Font: props => props.Font,
  Padding: props => props.Padding || '0 5% 0 5%',
  Width: props => props.Width || '100vw',
  TextAlign: props => props.TextAlign || 'center'
})`
  font-size: ${props => props.Size};
  color: ${props => props.Color};
  font-weight: ${props => props.Weight};
  font-family: ${props => props.Font};
  padding: ${props => props.Padding};
  width: ${props => props.Width};
  text-align: ${props => props.TextAlign} 
`
