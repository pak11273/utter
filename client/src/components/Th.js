import React from 'react'
import styled from 'styled-components'

const Th = styled.th`
  border: ${props => props.border};
  border-bottom: ${props => props.borderbottom};
  color: ${props => props.color};
  display: ${props => props.display};
  font-family: ${props => props.fontfamily};
  font-size: ${props => props.fontsize};
  font-weight: ${props => props.fontweight};
  padding: ${props => props.padding};
  align: ${props => props.align} 
  width: ${props => props.width};
`
Th.defaultProps = {
  fontsize: '2rem',
  fontweight: '400',
  padding: props => '.5% 5% 0 5%',
  width: '100%',
  textalign: 'left'
}

export default Th
