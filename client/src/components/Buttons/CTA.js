import React, {Component} from 'react'
import styled from 'styled-components'

const ButtonCta = styled.button`
  background: ${props => props.background};
  border: '2px solid' + ${props => props.theme.color};
  border-radius: ${props => props.borderradius};
  color: ${props => props.color};
  font-size: ${props => props.fontsize};
  font-weight: ${props => props.weight};
  margin: ${props => props.margin};
  padding: ${props => props.padding};
  width: ${props => props.width};
`
ButtonCta.defaultProps = {
  background: props => props.theme.color,
  borderradius: '.2rem',
  color: 'white',
  fontsize: '2rem',
  margin: '2rem auto',
  padding: '.3em 2rem .6rem 2rem',
  weight: '600'
}

export default ButtonCta
