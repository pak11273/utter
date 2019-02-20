import gql from "graphql-tag"

export const addTest = gql`
  mutation addTest($name: String!) {
    addTest(name: $name) {
      id
      testName
    }
  }
`

export const getTest = gql`
  query {
    users {
      id
      testName
    }
  }
`

export const deleteTest = gql`
  mutation deleteTest($id: String!) {
    deleteTest(id: $id) {
      id
      testName
    }
  }
`

export const updateTest = gql`
  mutation updateTest($id: String!, $name: String!) {
    updateTest(id: $id, name: $name) {
      id
      testName
    }
  }
`
