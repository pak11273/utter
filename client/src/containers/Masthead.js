import React, {Component} from 'react'
import styled, {ThemeProvider} from 'styled-components'

const Masthead = styled.div`
  align-items: ${props => props.alignitems};
  background: ${props => props.background};
  background-size: ${props => props.backgroundsize};
  box-sizing: border-box;
  display: flex;
  flex-direction: ${props => props.flexdirection};
  height: ${props => props.height};
  justify-content: ${props => props.justifycontent};
  margin: ${props => props.margin};
  overflow: hidden;
  padding: ${props => props.padding};
  position: relative;
  text-align: ${props => props.textalign};
  width: ${props => props.width};
`
Masthead.defaultProps = {
  alignitems: 'center',
  backgroundsize: 'cover',
  background: 'white',
  height: '500px',
  flexdirection: 'column',
  justifycontent: 'center',
  textalign: 'center',
  width: '100%'
}

export default Masthead
