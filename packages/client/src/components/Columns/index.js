import { Component } from 'react';
import styled from 'styled-components'

const Column = styled.div`
  align-items: ${props => props.alignitems};
  background: ${props => props.background};
  color: ${props => props.color};
  display: ${props => props.display};
  flex-direction: ${props => props.flexdirection};
  flex-wrap: ${props => props.flexwrap};
  font-size: ${props => props.fontsize};
  grid-area: ${props => props.gridarea};
  height: ${props => props.height};
  justify-content: ${props => props.justifycontent};
  margin: ${props => props.margin};
  min-width: ${props => props.minwidth};
  max-width: ${props => props.maxwidth};
  padding: ${props => props.padding};
  position: ${props => props.position};
  text-align: ${props => props.textalign};
  width: ${props => props.width};

  @media (min-width: 768px) {
    align-items: ${props => props.alignitems768};
    flex-direction: ${props => props.flexdirection768};
    justify-content: ${props => props.justifycontent768};
    padding: ${props => props.padding768};
    width: ${props => props.width768};
  }

  @media (min-width: 960px) {
    align-items: ${props => props.alignitems960};
    flex-direction: ${props => props.flexdirection960};
    justify-content: ${props => props.justifycontent960};
    padding: ${props => props.padding960};
    width: ${props => props.width960};
  }
`
Column.defaultProps = {
  alignitems: 'center',
  background: 'transparent',
  display: 'flex',
  flexdirection: 'column',
  justifycontent: 'flex-start',
  overflow: 'hidden',
  width: '100%'
}

export default Column
