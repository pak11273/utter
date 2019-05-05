import gql from "graphql-tag"

export const REMOVE_SUBSCRIPTION = gql`
  mutation removeSubscription($subscribedCourse: String) {
    removeSubscription(subscribedCourse: $subscribedCourse) {
      _id
      username
      isCanceled
      rights
      roles
      subscriptions {
        _id
        title
        levels {
          _id
          title
        }
      }
    }
  }
`

export const LOGIN_MUTATION = gql`
  mutation loginMutation($identifier: String!, $password: String!) {
    login(input: {identifier: $identifier, password: $password}) {
      token
      user {
        _id
        isCanceled
        username
        roles
        rights
        subscriptions {
          _id
          title
          levels {
            _id
          }
        }
      }
      error {
        path
        message
      }
    }
  }
`
