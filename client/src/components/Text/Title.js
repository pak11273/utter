import React from 'react'
import styled from 'styled-components'

const Title = styled.div`
  color: ${props => props.color};
  font-family: ${props => props.fontfamily};
  font-size: ${props => props.fontsize};
  font-weight: ${props => props.fontweight};
  padding: ${props => props.padding};
  text-align: ${props => props.textalign} 
  width: ${props => props.width};
`
Title.defaultProps = {
  color: props => props.theme.color,
  fontsize: '4rem',
  fontweight: '600',
  fontfamily: 'Arial',
  padding: '0 5% 0 5%',
  width: '100%',
  textalign: 'center'
}

export default Title
