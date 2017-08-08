import React from 'react'
import styled from 'styled-components'

const Box = styled.div`
  align-items: ${props => props.alignitems};
  color: ${props => props.color};
  display: ${props => props.display};
  font-family: ${props => props.fontfamily};
  font-size: ${props => props.fontsize};
  font-weight: ${props => props.fontweight};
  justify-content: ${props => props.justifycontent};
  padding: ${props => props.padding};
  text-align: ${props => props.textalign};
  width: ${props => props.width};
`
Box.defaultProps = {
  alignitems: 'center',
  color: props => props.theme.color,
  display: 'flex',
  fontfamily: 'Arial',
  fontsize: '2rem',
  fontweight: '400',
  justifycontent: 'column',
  padding: props => '.5% 5% 0 5%',
  width: '100%',
  textalign: 'center'
}

export default Box
