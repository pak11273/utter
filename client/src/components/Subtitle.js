import React from 'react'
import styled from 'styled-components'

const Subtitle = styled.div`
  color: ${props => props.color};
  display: ${props => props.display};
  font-family: ${props => props.fontfamily};
  font-size: ${props => props.fontsize};
  font-weight: ${props => props.fontweight};
  padding: ${props => props.padding};
  text-align: ${props => props.textalign} 
  width: ${props => props.width};
`
Subtitle.defaultProps = {
  fontsize: '2rem',
  fontweight: '600',
  padding: '2% 0 0 0',
  width: '100%'
}

export default Subtitle
