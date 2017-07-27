import React from 'react'
import styled from 'styled-components'

const Label = styled.div`
  color: ${props => props.color};
  font-family: ${props => props.fontfamily};
  font-size: ${props => props.fontsize};
  font-weight: ${props => props.fontweight};
  margin: ${props => props.margin};
  padding: ${props => props.padding};
  width: ${props => props.width};
  text-align: ${props => props.textalign} 
`

Label.defaultProps = {
  color: props => props.theme.color,
  fontfamily: 'Arial',
  fontsize: '1.2rem',
  fontweight: '400',
  margin: '3rem 0 0 0',
  padding: '.5% 5% 0 5%',
  textalign: 'center',
  width: '100%'
}

export default Label
