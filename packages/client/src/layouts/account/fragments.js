import gql from "graphql-tag"

export const accountFragment = gql`
  fragment UserInfo on User {
    _id
    email
    roles
    ccLast4
  }
`
