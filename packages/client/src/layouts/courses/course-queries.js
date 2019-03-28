import gql from "graphql-tag"

export const GET_COURSES = gql`
  query getCourses(
    $cursor: String
    $searchInput: String
    $selectionBox: String
    $usingLang: String!
    $teachingLang: String!
  ) {
    getCourses(
      input: {
        cursor: $cursor
        searchInput: $searchInput
        selectionBox: $selectionBox
        usingLang: $usingLang
        teachingLang: $teachingLang
      }
    ) {
      courses {
        _id
        courseImage
        courseMode
        title
        courseDescription
        levels {
          _id
          level
          title
        }
        resource
        usingLang
        subscribers
        teachingLang
        owner {
          username
          subscriptions {
            _id
          }
        }
      }
      cursor
    }
  }
`
