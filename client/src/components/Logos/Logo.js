import { Component } from 'react';
import styled from 'styled-components'

const Logo = styled.div`
  background: ${props => props.background};
  display: ${props => props.display}; 
  color: ${props => props.color};
  font-size: 2rem;
  height: ${props => props.height}; 
  padding: 0rem;
  width: ${props => props.width}; 

  @media(min-width:425px) {
    width: ${props => props.width425};
  }

  @media(min-width:768px) {
    display: ${props => props.display768};
    width: ${props => props.width768};
  }
`
Logo.defaultProps = {
  color: 'black',
  display: 'none',
  background: 'white',
  width: '100%',
  height: '100%'
}

export default Logo
