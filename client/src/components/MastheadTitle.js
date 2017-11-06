import React from 'react'
import styled from 'styled-components'

const MastheadTitle = styled.div`
  color: ${props => props.color};
  font-family: ${props => props.fontfamily};
  font-size: ${props => props.fontsize};
  font-weight: ${props => props.fontweight};
  padding: ${props => props.padding};
  text-align: ${props => props.textalign} 
  width: ${props => props.width};
`
MastheadTitle.defaultProps = {
  color: 'white',
  fontsize: '3rem',
  fontweight: '600',
  padding: '20px',
  width: '100%',
  textalign: 'center'
}

export default MastheadTitle
