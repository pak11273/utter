import React from 'react'
import styled from 'styled-components'

const Select = styled.select`
  color: ${props => props.color};
  display: ${props => props.display};
  font-family: ${props => props.fontfamily};
  font-size: ${props => props.fontsize};
  font-weight: ${props => props.fontweight};
  margin: ${props => props.margin};
  padding: ${props => props.padding};
  text-align: ${props => props.textalign} 
  width: ${props => props.width};
`
Select.defaultProps = {
  color: props => props.theme.color,
  fontsize: '1rem'
}

export default Select
