import React from 'react'
import styled from 'styled-components'

export default styled.div.attrs({
  Size: props => props.Size || '2rem',
  Weight: props => props.Weight || '400',
  Color: props => props.Color || props.theme.color,
  Font: props => props.Font,
  Padding: props => props.Padding || '.5% 5% 0 5%',
  Width: props => props.Width || '100%',
  TextAlign: props => props.TextAlign || 'center'
})`
  padding: ${props => props.Padding};
  color: ${props => props.Color};
  font-size: ${props => props.Size};
  font-weight: ${props => props.Weight};
  font-family: ${props => props.Font};
  width: ${props => props.Width};
  text-align: ${props => props.TextAlign} 
`
