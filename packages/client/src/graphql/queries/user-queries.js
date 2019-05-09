import gql from "graphql-tag"
import {accountFragment} from "../fragments/user-fragments.js"

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
