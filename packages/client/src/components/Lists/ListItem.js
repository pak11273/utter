import React from 'react'
import styled from 'styled-components'

const Style = styled.li`
  align-items: ${props => props.alignitems};
  color: ${props => props.color};
  display: ${props => props.display};
  font-family: ${props => props.fontfamily};
  font-size: ${props => props.fontsize};
  font-weight: ${props => props.fontweight};
  padding: ${props => props.padding};
  width: ${props => props.width};
`
Style.defaultProps = {
  fontsize: '1rem'
}

const ListItem = props =>
  <Style
    alignitems={props.alignitems}
    display={props.display}
    fontsize={props.fontsize}
    padding={props.padding}>
    {props.children}
  </Style>

export default ListItem
