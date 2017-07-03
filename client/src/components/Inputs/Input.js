import React from 'react'
import styled from 'styled-components'

export default styled.input.attrs({
  size: props => props.size || '1.5rem',
  weight: props => props.weight || '100',
  color: props => props.color || props.theme.color,
  font: props => props.font,
  padding: props => props.padding || '3px 5% 2px 5%',
  width: props => props.width || '200px',
  textalign: props => props.textalign || 'center',
  height: props => props.height || '2rem',
  margin: props => props.margin || '10px auto'
})`
  padding: ${props => props.padding};
  color: ${props => props.color};
  font-size: ${props => props.size};
  font-weight: ${props => props.weight};
  font-family: ${props => props.font};
  width: ${props => props.width};
  text-align: ${props => props.textalign};
  height: ${props => props.height};
  margin: ${props => props.margin};
`
