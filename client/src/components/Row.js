import { Component } from 'react';
import styled from 'styled-components'

const Row = styled.div`
  align-items: ${props => props.alignitems};
  background-color: ${props => props.background};
  display: ${props => props.display};
  flex-direction: ${props => props.flexdirection};
  flex-wrap: ${props => props.flexwrap};
  font-size: ${props => props.fontsize};
  height: ${props => props.height};
  justify-content: ${props => props.justifycontent};
  max-width: ${props => props.maxwidth};
  margin: ${props => props.margin};
  overflow: hidden;
  padding: ${props => props.padding};
  position: ${props => props.position};
  text-align: left;
  width: ${props => props.width};

  @media(min-width: 768px) {
    align-items: ${props => props.alignitems768};
    display: ${props => props.display768};
    flex-direction: ${props => props.flexdirection768};
    flex-wrap: ${props => props.flexwrap768};
    justify-content: ${props => props.justifycontent768};
    margin: ${props => props.margin768};
    max-width: ${props => props.maxwidth768};
    padding: ${props => props.padding768};
    width: ${props => props.width768};
  }

  @media(min-width: 960px) {
    align-items: ${props => props.alignitems960};
    display: ${props => props.display960};
    flex-direction: ${props => props.flexdirection960};
    flex-wrap: ${props => props.flexwrap960};
    justify-content: ${props => props.justifycontent960};
    max-width: ${props => props.maxwidth960};
    padding: ${props => props.padding960};
    width: ${props => props.width960};
  }
`
Row.defaultProps = {
  background: 'transparent',
  display: 'flex',
  flexdirection: 'column',
  flexwrap: 'wrap',
  fontsize: '1rem',
  justifycontent: 'center',
  maxwidth768: '720px',
  maxwidth960: '1240px',
  padding: '1rem',
  width: '100%'
}

export default Row
