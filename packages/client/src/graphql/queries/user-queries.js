import gql from "graphql-tag"
import {accountFragment} from "../fragments/user-fragments.js"

export const GET_BETA_TESTERS = gql`
  query getBetaTesters {
    getBetaTesters {
      _id
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
      createdAt
      updatedAt
    }
  }
`

export const BETA_ACCESS = gql`
  query betaAccess($key: String) {
    betaAccess(key: $key)
  }
`
export const ME_QUERY = gql`
  query me {
    me {
      ...UserInfo
    }
  }

  ${accountFragment}
`

export const GET_NOTIFICATIONS = gql`
  query getNotifications {
    getNotifications {
      requests {
        _id
        username
      }
    }
  }
`

export const GET_USER_BY_TOKEN = gql`
  query getUserByToken($token: String!) {
    getUserByToken(token: $token) {
      ...UserInfo
    }
  }

  ${accountFragment}
`

export const GET_USERS = gql`
  query getUsers($page: Int) {
    getUsers(page: $page) {
      users {
        _id
        username
        email
        avatar
        blocked
        confirmed
        forgotPasswordLocked
        gender
        firstName
        lastName
        isCanceled
        roles
        stripeId
        subscriptions {
          _id
        }
        rights
        createdAt
        updatedAt
      }
      page
      more
    }
  }
`
