import {injectGlobal} from 'styled-components'
import OpenSans from './Open_Sans/OpenSans-Regular.ttf'
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

  body, h1, h2, h3, h4, h6, div, li {
    color: #777;
    font-family: 'Open Sans', sans-serif;
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

  // a:visited {
  //   color: purple;
  // }

  // // global colors
  // body {
  //   color: green;
  // }
`
