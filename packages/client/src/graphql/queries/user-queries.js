import gql from "graphql-tag"
import {accountFragment} from "../fragments/user-fragments.js"

export const ME_QUERY = gql`
  query me {
    me {
      ...UserInfo
    }
  }

  ${accountFragment}
`
