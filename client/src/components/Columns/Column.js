import React, {Component} from 'react'
import styled from 'styled-components'

const Column = styled.div`
  align-items: ${props => props.alignitems};
  background: ${props => props.background};
  color: ${props => props.color};
  display: ${props => props.display};
  flex-direction: ${props => props.flexdirection};
  font-size: ${props => props.fontsize};
  height: ${props => props.height};
  margin: ${props => props.margin};
  overflow: hidden;
  padding: ${props => props.padding};
  position: ${props => props.position};
  text-align: left;
  width: ${props => props.width};

  @media(min-width: 960px) {
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
  flexdirection: 'column',
  fontsize: '1rem',
  justifycontent: 'center',
  padding: '1rem',
  position: 'relative',
  width: '100%'
}

export default Column
