import gql from "graphql-tag"

export const ADD_CONTACT = gql`
  mutation addContact($sender: String, $contact: String) {
    addContact(sender: $sender, contact: $contact) {
			_id
			username
		}
  }
`

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
        languagesFluent: $languagesFluent
        linkedIn: $linkedIn
        nativeLang: $nativeLang
        whyLearning: $whyLearning
      }
    )
  }
`

export const BETA_ACCESS = gql`
  mutation betaAccess($key: String) {
    betaAccess(key: $key)
  }
`
export const CHANGE_PASSWORD = gql`
  mutation changePassword(
    $password: String!
    $passwordConfirmation: String
    $token: String!
  ) {
    changePassword(
      input: {
        password: $password
        passwordConfirmation: $passwordConfirmation
        token: $token
      }
    ) {
      token
      error {
        path
        message
      }
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
        hostedZone {
          _id
          courseLevel
          zoneName
          course {
            _id
          }
        }
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
  mutation renewConfirmation($email: String) {
    renewConfirmation(email: $email)
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
