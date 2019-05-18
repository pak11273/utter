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

export const GET_USER_BY_TOKEN = gql`
  query getUserByToken($token: String!) {
    getUserByToken(token: $token) {
      ...UserInfo
    }
  }

  ${accountFragment}
`
