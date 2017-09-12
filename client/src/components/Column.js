import React, {Component} from 'react'
import styled from 'styled-components'

const Column = styled.div`
  align-items: ${props => props.alignitems};
  background: ${props => props.background};
  color: ${props => props.color};
  display: ${props => props.display};
  flex-direction: ${props => props.flexdirection};
  flex-wrap: ${props => props.flexwrap};
  font-size: ${props => props.fontsize};
  height: ${props => props.height};
  max-width: ${props => props.maxwidth};
  margin: ${props => props.margin};
  padding: ${props => props.padding};
  position: ${props => props.position};
  text-align: ${props => props.textalign};
  width: ${props => props.width};

  @media(min-width: 768px) {
    align-items: ${props => props.alignitems768};
    flex-direction: ${props => props.flexdirection768};
    flex-wrap: ${props => props.flexwrap768};
    justify-content: ${props => props.justifycontent768};
    padding: ${props => props.padding768};
    width: ${props => props.width768};
  }

  @media(min-width: 960px) {
    align-items: ${props => props.alignitems960};
    flex-direction: ${props => props.flexdirection960};
    flex-wrap: ${props => props.flexwrap960};
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
  flexwrap: 'wrap',
  fontsize: '1rem',
  justifycontent: 'center',
  padding: '1rem',
  width: '100%'
}

export default Column
