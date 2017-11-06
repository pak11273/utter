import React, {Component} from 'react'
import styled from 'styled-components'

const Section = styled.section`
  align-items: ${props => props.alignitems};
  background: ${props => props.background};
  box-sizing: ${props => props.borderbox};
  display: ${props => props.display};
  flex-direction: ${props => props.flexdirection};
  flex-wrap: ${props => props.flexwrap};
  height: ${props => props.height};
  li {
    font-size: ${props => props.lifontsize};
  }
  justify-content: ${props => props.justifycontent};
  margin: ${props => props.margin};
  max-width: ${props => props.maxwidth};
  opacity: ${props => props.opacity};
  padding: ${props => props.padding};
  position: ${props => props.position};
  width: ${props => props.width};

  @media(min-width: 768px) {
    flex-direction: ${props => props.flexdirection768};
    height:${props => props.height768};
    width: ${props => props.width768};
  }

  @media(min-width: 960px) {
    flex-direction: ${props => props.flexdirection960};
    height:${props => props.height960};
    width: ${props => props.width960};
  }
`
Section.defaultProps = {
  alignitems: 'center',
  boxsizing: 'border-box',
  color: 'black',
  display: 'flex',
  flexdirection: 'row',
  justifycontent: 'center',
  margin: '0 auto',
  width: '100%'
}

export default Section
