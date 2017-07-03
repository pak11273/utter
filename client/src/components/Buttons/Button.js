import React, {Component} from 'react'
import styled from 'styled-components'

export default styled.button.attrs({
  color: props => props.color || '2px solid' + (props => props.theme.color),
  radius: props => props.radius || '.2rem',
  size: props => props.size || '2rem',
  weight: props => props.weight || '600',
  height: props => props.height,
  padding: props => props.padding || '.3em 2rem .6rem 2rem',
  margin: props => props.margin || '2rem auto',
  bg: props => props.theme.color
})`
  color: ${props => props.color};
  border-radius: ${props => props.radius};
  font-size: ${props => props.size};
  font-weight: ${props => props.weight};
  width: ${props => props.width};
  height: ${props => props.height};
  padding: ${props => props.padding};
  margin: ${props => props.margin};
  background: ${props => props.bg};
  border: '2px solid' + ${props => props.theme.color};
`
