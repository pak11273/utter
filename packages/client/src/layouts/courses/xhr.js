import gql from "graphql-tag"


export const GET_COURSE = gql`
  query getCourse($_id: ID!) {
    getCourse(_id: $_id) {
      _id
      courseImage
      courseMode
      title
      courseDescription
      levels {
        _id
        title
      }
      levelSort
      resource
      usingLang
      subscribers
      teachingLang
    }
  }
`

