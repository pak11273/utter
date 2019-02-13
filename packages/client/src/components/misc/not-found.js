import React from "react"
import {Route} from "react-router-dom"
import styled from "styled-components"

const Status = ({code, children}) => (
  <Route
    render={({staticContext}) => {
      if (staticContext) staticContext.status = code
      return children
    }}
  />
)

const Error = styled.h6`
  padding: 100px 0;
  text-align: center;
`
export default () => (
  <Status code={404}>
    <Error>404. This page does not exist.</Error>
  </Status>
)
