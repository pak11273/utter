import React from 'react'
import styled from 'styled-components'

const OrderedList = styled.ol`
  color: ${props => props.color};
  display: ${props => props.display};
  font-family: ${props => props.fontfamily};
  font-size: ${props => props.fontsize};
  font-weight: ${props => props.fontweight};
  list-style-type: ${props => props.liststyletype};
  padding: ${props => props.padding};
  text-align: ${props => props.textalign};
  width: ${props => props.width};
`
OrderedList.defaultProps = {
  color: props => props.theme.color,
  display: 'block',
  fontsize: '1rem',
  liststyletype: 'none',
  textalign: 'center'
}

const styledOrderedList = props => {
  return <OrderedList {...props} />
}

export default styledOrderedList
