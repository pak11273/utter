import React, {Component} from 'react'
import styled from 'styled-components'

export default styled.section`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  // global styles
  body, h1, h2, h3, h4, h6, div, li {
      color: 'blue';
      box-sizing: border-box;
  }
  
  h1 {
      font-size: 8rem;
  }
  
  h2 {
      font-size: 7rem;
  }
  
  h3 {
      font-size: 6rem;
  }
  
  h4 {
      font-size: 5rem;
  }
  
  h5 {
      font-size: 4rem;
  }
  
  h6 {
      font-size: 3rem;
  }
  
  p, li, a {
    font-size: 1rem;
    text-decoration: none;
  }

  a:visited {
    color: purple;
  }
`
