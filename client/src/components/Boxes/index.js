import React from 'react'
import styled from 'styled-components'

const Box = styled.div`
  align-items: ${props => props.alignitems};
  align-self: ${props => props.alignself};
  background: ${props => props.background};
  border: ${props => props.background};
  box-sizing: ${props => props.boxsizing};
  color: ${props => props.color};
  display: ${props => props.display};
  flex-direction: ${props => props.flexdirection};
  font-family: ${props => props.fontfamily};
  font-size: ${props => props.fontsize};
  font-weight: ${props => props.fontweight};
  grid-column: ${props => props.gridcolumn};
  grid-row: ${props => props.gridrow};
  height: ${props => props.height};
  justify-content: ${props => props.justifycontent};
  line-height: ${props => props.lineheight};
  margin: ${props => props.margin};
  padding: ${props => props.padding};
  max-width: ${props => props.maxwidth};
  min-width: ${props => props.minwidth};
  max-height: ${props => props.maxheight};
  min-height: ${props => props.minheight};
  overflow: ${props => props.overflow};
  overflow-x: ${props => props.overflowx};
  overflow-y: ${props => props.overflowy};
  text-align: ${props => props.textalign};
  text-overflow: ${props => props.textoverflow};
  top: ${props => props.top};
  white-space: ${props => props.whitespace};
  width: ${props => props.width};

  @media(min-width: 640px) {
    width: ${props => props.minwidth640};
  }
`
Box.defaultProps = {
  alignitems: 'center',
  boxsizing: 'border-box',
  display: 'flex',
  flexdirection: 'column',
  justifycontent: 'center',
  overflow: 'hidden',
  textalign: 'left',
  width: '100%'
}

export default Box
