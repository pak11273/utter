import gql from "graphql-tag"

export const CREATE_PAY_MONTHLY = gql`
  mutation createPayMonthly($source: String!) {
    createPayMonthly(source: $source) {
      _id
      email
      roles
    }
  }
`
