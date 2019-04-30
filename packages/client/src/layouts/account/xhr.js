import gql from "graphql-tag"
import {accountFragment} from "./fragments.js"

export const CREATE_PAY_MONTHLY = gql`
  mutation createPayMonthly($source: String!, $ccLast4: String) {
    createPayMonthly(source: $source, ccLast4: $ccLast4) {
      ...UserInfo
    }
  }

  ${accountFragment}
`

export const CHANGE_CREDIT_CARD = gql`
  mutation changeCreditCard($source: String!, $ccLast4: String) {
    changeCreditCard(source: $source, ccLast4: $ccLast4) {
      ...UserInfo
    }
  }

  ${accountFragment}
`
