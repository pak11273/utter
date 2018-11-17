import {Component} from 'react'
import styled from 'styled-components'

const Wrapper = styled.section`
  align-items: ${props => props.alignitems};
  background: ${props => props.background};
  color: ${props => props.color};
  display: ${props => props.display};
  flex-direction: ${props => props.flexdirection};
  font-family: ${props => props.fontfamily};
  font-size: ${props => props.fontsize};
  font-weight: ${props => props.fontweight};
  height: ${props => props.height};
  justify-content: ${props => props.justifycontent};
  margin: ${props => props.margin};
  padding: ${props => props.padding};
  text-align: ${props => props.textalign};
  max-width: ${props => props.maxwidth};
  min-width: ${props => props.minwidth};
  overflow: ${props => props.overflow};
  overflow-x: ${props => props.overflowx};
  overflow-y: ${props => props.overflowy};
  width: ${props => props.width};

  @media (min-width: 375px) {
    flex-direction: ${props => props.flexdirection375};
    height: ${props => props.height375};
    width: ${props => props.width375};
    min-width: ${props => props.width375};
  }

  @media (min-width: 768px) {
    flex-direction: ${props => props.flexdirection768};
    height: ${props => props.height768};
    width: ${props => props.width768};
  }

  @media (min-width: 960px) {
    flex-direction: ${props => props.flexdirection960};
    height: ${props => props.height960};
    width: ${props => props.width960};
    max-width: ${props => props.maxwidth960};
  }

  @media (min-width: 1024px) {
    flex-direction: ${props => props.flexdirection1024};
    height: ${props => props.height1024};
    width: ${props => props.width1024};
  }
`

Wrapper.defaultProps = {
  display: 'grid',
  margin: '0 auto',
  width: '100%'
}

export default Wrapper
