import React from 'react'
import styled from 'styled-components'

const ListItem = styled.li`
  color: ${props => props.color};
  display: ${props => props.display};
  font-family: ${props => props.fontfamily};
  font-size: ${props => props.fontsize};
  font-weight: ${props => props.fontweight};
  padding: ${props => props.padding};
  width: ${props => props.width};
`
ListItem.defaultProps = {
  fontsize: '1rem'
}

export default ListItem
