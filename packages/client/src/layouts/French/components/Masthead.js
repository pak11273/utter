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
  fontweight: '900',
  padding: '20px',
  width: '100%',
  textalign: 'center'
}

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

const Wrap = styled.div`
  align-items: ${props => props.alignitems};
  background: ${props => props.background};
  background-size: ${props => props.backgroundsize};
  box-sizing: ${props => props.borderbox};
  display: ${props => props.display};
  flex-direction: ${props => props.flexdirection};
  height: ${props => props.height};
  justify-content: ${props => props.justifycontent};
  margin: ${props => props.margin};
  min-height: ${props => props.minheight};
  overflow: hidden;
  padding: ${props => props.padding};
  position: relative;
  text-align: ${props => props.textalign};
  width: ${props => props.width};
`
Wrap.defaultProps = {
  alignitems: 'center',
  backgroundsize: 'cover',
  background: '#EE2536',
  boxsizing: 'border-box',
  display: 'flex',
  flexdirection: 'column',
  margin: '0 auto',
  minheight: '500px',
  padding: '40px 0 40px 0',
  justifycontent: 'center',
  textalign: 'center',
  width: '100%'
}

const Masthead = ({props, title, subtitle}) =>
  <Wrap>
    <MastheadTitle>
      {title}
    </MastheadTitle>
    <MastheadSubtitle>
      {subtitle}
    </MastheadSubtitle>
  </Wrap>

export default Masthead
