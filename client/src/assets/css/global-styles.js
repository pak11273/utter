import {injectGlobal} from 'styled-components'
import OpenSans from '../../assets/css/fonts/OpenSans-Regular.ttf'
// box-sizing: border-box;
// display: flex;
// flex-direction: column;
// box-sizing: border-box;
// Global style
// eslint-disable-next-line

injectGlobal`

  @font-face {
    font-family: 'Open Sans';
    src: url(${OpenSans});
  }

  body, h1, h2, h3, h4, h6, div, p, li {
    box-sizing: border-box;
    font-family: 'Open Sans';
    color: #777;
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

  a:-webkit-any-link {
    color: #003478;
  }

// chrome input and textarea fixes
  textarea:focus, input:focus {
      -webkit-box-shadow: 0 0 0px 1000px white inset !important;
      // change text color
      // -webkit-text-fill-color: red !important;
  }
// eof

  input {
    border: 1px solid rgb(169,169,169);
    border-width: thin; 
  }

  // // global colors
  // body {
  //   color: green;
  // }
`
