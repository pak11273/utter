import {Component} from 'react'
import styled, {ThemeProvider} from 'styled-components'

const Masthead = styled.div`
  align-items: ${props => props.alignitems};
  background: ${props => props.background};
  background-size: ${props => props.backgroundsize};
  box-sizing: ${props => props.borderbox};
  display: ${props => props.display};
  flex-direction: ${props => props.flexdirection};
  grid-area: ${props => props.gridarea};
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
  boxsizing: 'border-box',
  display: 'grid',
  flexdirection: 'column',
  height: '500px',
  margin: '0 auto',
  justifycontent: 'center',
  textalign: 'center',
  width: '100%'
}

export default Masthead
