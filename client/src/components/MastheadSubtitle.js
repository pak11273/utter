import React from 'react'
import styled from 'styled-components'

const MastheadSubtitle = styled.div`
  color: ${props => props.color};
  font-family: ${props => props.fontfamily};
  font-size: ${props => props.fontsize};
  font-weight: ${props => props.fontweight};
  padding: ${props => props.padding};
  text-align: ${props => props.textalign} 
  width: ${props => props.width};
`
MastheadSubtitle.defaultProps = {
  color: '#bbb',
  fontsize: '2rem',
  fontweight: '600',
  padding: '20px',
  width: '100%',
  textalign: 'left'
}

export default MastheadSubtitle
