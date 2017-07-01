import React, {Component} from 'react'
import styled, {ThemeProvider} from 'styled-components'

export default styled.div.attrs({
  height: props => props.height || '500px',
  dir: props => props.dir || 'column',
  bg: props => props.bg || 'white',
  text: props => props.text || 'center'
})`
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: ${props => props.dir};
  justify-content: center;
  align-items: flex-start;
  position: relative;
  background: ${props => props.bg};
  height: ${props => props.height};
  width: 100vw;
  background-size: cover;
  text-align: ${props => props.text};

`
