import gql from "graphql-tag"

export const BETA_SIGNUP = gql`
  mutation betaSignup(
    $ageGroup: String
    $chosen: Boolean
    $country: String
    $currentlyLearning: String
    $dayLearningHrs: String
    $email: String
    $firstName: String
    $gender: String
    $howLongLearning: String
    $lastName: String
    $languagesFluent: String
    $linkedIn: String
    $nativeLang: String
    $whyLearning: String
  ) {
    betaSignup(
      input: {
        ageGroup: $ageGroup
        chosen: $chosen
        country: $country
        currentlyLearning: $currentlyLearning
        dayLearningHrs: $dayLearningHrs
        email: $email
        firstName: $firstName
        gender: $gender
        howLongLearning: $howLongLearning
        lastName: $lastName
        languagesFluent: $languageFluent
        linkedIn: $linkedIn
        nativeLang: $nativeLang
        whyLearning: $whyLearning
      }
    ) {
      Boolean
    }
  }
`

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
        confirmed
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

export const RENEW_CONFIRAMTION = gql`
  mutation renewConfirmation($redisKey: String) {
    renewConfirmation(email: $redisKey) {
      Boolean
    }
  }
`

export const SIGNUP_MUTATION = gql`
  mutation signupMutation(
    $username: String!
    $email: String!
    $password: String!
    $passwordConfirmation: String!
    $timezone: String
  ) {
    signup(
      input: {
        username: $username
        email: $email
        password: $password
        passwordConfirmation: $passwordConfirmation
        timezone: $timezone
      }
    ) {
      token
      user {
        _id
        username
        email
        roles
        rights
      }
      error {
        path
        message
      }
    }
  }
`
