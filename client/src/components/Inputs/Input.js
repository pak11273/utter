import React from 'react'
import styled from 'styled-components'

export default styled.input.attrs({
  Size: props => props.Size || '2rem',
  Weight: props => props.Weight || '400',
  Color: props => props.Color || props.theme.color,
  Font: props => props.Font,
  Padding: props => props.Padding || '.5% 5% 0 5%',
  Width: props => props.Width || '100px',
  TextAlign: props => props.TextAlign || 'center',
  height: props => props.height || '1rem',
  margin: props => props.margin || '0 auto'
})`
  padding: ${props => props.Padding};
  color: ${props => props.Color};
  font-size: ${props => props.Size};
  font-weight: ${props => props.Weight};
  font-family: ${props => props.Font};
  width: ${props => props.Width};
  text-align: ${props => props.TextAlign};
  height: ${props => props.height};
  margin: ${props => props.margin};
`
