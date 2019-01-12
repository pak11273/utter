import React from 'react'
import gql from "graphql-tag"
import {Query} from "react-apollo"
import { ContextProvider } from '../../app/context'

const getUser = gql`
  {
    getUserByToken {
      id
      username
      roles
      scopes
      email
    }
  }
`

export default props => (
  <Query query={getUser}  >
    {({loading, error, data }) => {
      if (loading) return null 
      if (error) return `Error! ${error.message}`
      return <ContextProvider value={data}>{props.children}</ContextProvider>
    }}
  </Query>
)

