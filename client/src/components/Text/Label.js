import React from 'react'
import styled from 'styled-components'

export default styled.div.attrs({
  size: props => props.size || '2rem',
  weight: props => props.weight || '400',
  color: props => props.color || props.theme.color,
  font: props => props.font,
  padding: props => props.padding || '.5% 5% 0 5%',
  margin: props => props.margin || '3rem 0 0 0',
  width: props => props.width || '100%',
  textalign: props => props.textalign || 'center'
})`
  padding: ${props => props.padding};
  margin: ${props => props.margin};
  color: ${props => props.color};
  font-size: ${props => props.size};
  font-weight: ${props => props.weight};
  font-family: ${props => props.font};
  width: ${props => props.width};
  text-align: ${props => props.textalign} 
`
