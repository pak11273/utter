import gql from "graphql-tag"

export const accountFragment = gql`
  fragment UserInfo on User {
    _id
    blocked
    ccLast4
    contacts
    email
    createdCourses {
      _id
    }
    rights
    roles
    subscriptions {
      _id
      title
      levels {
        _id
      }
    }
    username
  }
`
