import gql from "graphql-tag"

const ACCEPT_CONTACT_MUTATION = gql`
  mutation acceptContact($senderUsername: String!) {
    acceptContact(senderUsername: $senderUsername) {
      _id
      username
    }
  }
`

const ADD_CONTACT = gql`
  mutation addContact($sender: String, $contact: String) {
    addContact(sender: $sender, contact: $contact) {
      _id
      username
    }
  }
`

const BETA_ACCESS = gql`
  mutation betaAccess($key: String) {
    betaAccess(key: $key)
  }
`
const BETA_SIGNUP = gql`
  mutation betaSignup(
    $_id: String
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
        _id: $_id
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
const BETA_UPDATE = gql`
  mutation betaUpdate(
    $_id: String
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
    betaUpdate(
      input: {
        _id: $_id
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
    ) {
      ageGroup
      chosen
      country
      currentlyLearning
      dayLearningHrs
      email
      firstName
      gender
      howLongLearning
      lastName
      languagesFluent
      linkedIn
      nativeLang
      whyLearning
    }
  }
`
const CHANGE_PASSWORD = gql`
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
const LOGIN_MUTATION = gql`
  mutation loginMutation($identifier: String!, $password: String!) {
    login(input: {identifier: $identifier, password: $password}) {
      token
      user {
        avatar
        _id
        contacts {
          _id
          username
        }
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
        requests {
          _id
          username
        }
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

const REJECT_CONTACT_MUTATION = gql`
  mutation rejectContact($senderUsername: String!) {
    rejectContact(senderUsername: $senderUsername) {
      _id
      username
    }
  }
`
const REMOVE_SUBSCRIPTION = gql`
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

const RENEW_CONFIRAMTION = gql`
  mutation renewConfirmation($email: String) {
    renewConfirmation(email: $email)
  }
`
const SIGNUP_MUTATION = gql`
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
const USER_UPDATE = gql`
  mutation userUpdate($_id: ID) {
    userUpdate(input: {_id: $_id}) {
      _id
    }
  }
`

export {
  ACCEPT_CONTACT_MUTATION,
  ADD_CONTACT,
  BETA_ACCESS,
  BETA_SIGNUP,
  BETA_UPDATE,
  CHANGE_PASSWORD,
  LOGIN_MUTATION,
  REJECT_CONTACT_MUTATION,
  REMOVE_SUBSCRIPTION,
  RENEW_CONFIRAMTION,
  SIGNUP_MUTATION,
  USER_UPDATE
}
