import gql from "graphql-tag"

export const GET_LEVELS = gql`
  query getLevels($courseId: String!) {
    getLevels(courseId: $courseId) {
      levels {
        _id
        course
        title
      }
    }
  }
`

export const LEVEL_CREATE = gql`
  mutation levelCreate($courseId: String, $title: String) {
    levelCreate(input: {courseId: $courseId, title: $title}) {
      level {
        course
        _id
        title
      }
      errors {
        message
      }
    }
  }
`

export const LEVEL_SORT = gql`
  mutation levelSort($courseId: String, $levelSort: [String]) {
    levelSort(input: {courseId: $courseId, levelSort: $levelSort}) {
      level {
        _id
      }
      errors {
        message
      }
    }
  }
`

export const LEVEL_UPDATE = gql`
  mutation levelUpdate($_id: ID, $title: String) {
    levelUpdate(input: {_id: $_id, title: $title}) {
      level {
        course
        _id
        title
      }
      errors {
        message
      }
    }
  }
`

export const LEVEL_DELETE = gql`
  mutation levelDelete($_id: ID) {
    levelDelete(_id: $_id) {
      level {
        _id
      }
      errors {
        path
        message
      }
    }
  }
`
