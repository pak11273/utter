import {gql} from "apollo-boost"

const createUserMutation = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      username
      email
    }
  }
`

export {createUserMutation}
