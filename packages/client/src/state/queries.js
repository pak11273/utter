import gql from "graphql-tag"

export const chosenCourse = gql`
  mutation chosenCourse($input: String) @client {
    id
  }
`
