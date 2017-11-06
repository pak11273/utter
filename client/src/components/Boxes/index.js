import React from 'react'
import styled from 'styled-components'

const Box = styled.div`
  align-items: ${props => props.alignitems};
  background: ${props => props.background};
  color: ${props => props.color};
  display: ${props => props.display};
  flex-direction: ${props => props.flexdirection};
  font-family: ${props => props.fontfamily};
  font-size: ${props => props.fontsize};
  font-weight: ${props => props.fontweight};
  height: ${props => props.height};
  justify-content: ${props => props.justifycontent};
  margin: ${props => props.margin};
  padding: ${props => props.padding};
  text-align: ${props => props.textalign};
  max-width: ${props => props.maxwidth};
  min-width: ${props => props.minwidth};
  overflow: ${props => props.overflow};
  overflow-x: ${props => props.overflowx};
  overflow-y: ${props => props.overflowy};
  width: ${props => props.width};
`
Box.defaultProps = {
  alignitems: 'center',
  display: 'flex',
  flexdirection: 'column',
  justifycontent: 'center',
  padding: '.5% 5% 0 5%'
}

export default Box
