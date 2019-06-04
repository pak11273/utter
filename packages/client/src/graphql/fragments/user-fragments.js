import gql from "graphql-tag"

export const accountFragment = gql`
  fragment UserInfo on User {
    _id
    avatar
    blocked
    ccLast4
    contacts {
      _id
      username
    }
    email
    createdCourses {
      _id
    }
    hostedZone {
      _id
    }
    isCanceled
    requests {
      _id
      username
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
