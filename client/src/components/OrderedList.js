import React from 'react'
import styled from 'styled-components'

const OrderedList = styled.div`
  color: ${props => props.color};
  display: ${props => props.display};
  font-family: ${props => props.fontfamily};
  font-weight: ${props => props.fontweight};
  list-style-type: ${props => props.liststyletype};
  padding: ${props => props.padding};
  text-align: ${props => props.textalign};
  width: ${props => props.width};

  li {
    font-size: ${props => props.fontsize};
  }
`
OrderedList.defaultProps = {
  color: props => props.theme.color,
  display: 'block',
  fontsize: '1rem',
  fontfamily: 'Arial',
  liststyletype: 'none',
  textalign: 'center'
}

export default OrderedList
