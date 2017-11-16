import React from 'react'
import styled from 'styled-components'

const MastheadSubtitle = styled.div`
  color: ${props => props.color};
  font-family: ${props => props.fontfamily};
  font-size: ${props => props.fontsize};
  font-weight: ${props => props.fontweight};
  line-height: ${props => props.lineheight};
  padding: ${props => props.padding};
  text-align: ${props => props.textalign} 
  width: ${props => props.width};
`
MastheadSubtitle.defaultProps = {
  color: '#f1ded9',
  fontsize: '1.5rem',
  fontweight: '600',
  lineheight: '3rem',
  padding: '20px',
  width: '100%',
  textalign: 'left'
}

export default MastheadSubtitle
