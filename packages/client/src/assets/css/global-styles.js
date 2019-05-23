// eslint-disable-next-line
import {createGlobalStyle} from "styled-components"

export const GlobalStyle = createGlobalStyle`

	* {
	outline: none;
	}

	*:focus {
		outline: 0,
	} 

	/* HIDE SCROLLBAR */

	html {
		overflow: scroll;
		overflow-x: hidden;
	}
		::-webkit-scrollbar {
		width: 0px; /* remove scrollbar space /
		background: transparent; / optional: just make scrollbar invisible /
	}

	/ optional: show position indicator in red */
		::-webkit-scrollbar-thumb {
		background: #FF0000;
	}

	/* HIDE SCROLLBAR */

  body, h1, h2, h3, h4, h6, div, p, li {
    box-sizing: border-box;
    font-family: 'Helvetica Arial sans-serif';
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

  textarea:focus, input:focus {
      -webkit-box-shadow: 0 0 0px 1000px white inset !important;
  }

  input {
    border: 1px solid rgb(169,169,169);
    border-width: thin; 
  }

	.toast-container {
	  top: 5em !important;
	}

	.toasty {
		font-family: Helvetica Arial sans-serif;
		font-size: 1rem;
	}

	.toasty-body {
		color: white;
		font-family: Arial;
		padding-left: 30px;
	}


`
