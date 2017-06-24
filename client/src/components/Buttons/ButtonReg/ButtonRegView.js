import React, {Component} from 'react'
import styled from 'styled-components'

const Button = styled.button`
      font-size: 1em;
      margin: 1em;
      padding: .25em 1em;
      border-radius: 3px;
      width:100px;

      background: ${props => props.theme.main};
      border: 2px solid ${props => props.theme.main};
   `

Button.defaultProps = {
  theme: {
    main: 'palevioletred'
  }
}

const theme = {
  main: 'mediumseagrean'
}

export default Button
