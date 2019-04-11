import gql from "graphql-tag"

export const GET_LEVELS = gql`
  query getLevels($courseId: String!) {
    getLevels(courseId: $courseId) {
      levels {
        _id
        course
        level
        title
      }
    }
  }
`

export const LEVEL_CREATE = gql`
  mutation levelCreate($courseId: String, $level: Int, $title: String) {
    levelCreate(input: {courseId: $courseId, level: $level, title: $title}) {
      level {
        course
        _id
        level
        title
      }
      errors {
        message
      }
    }
  }
`

export const LEVEL_UPDATE = gql`
  mutation levelUpdate($_id: ID, $level: Int, $title: String) {
    levelUpdate(input: {_id: $_id, level: $level, title: $title}) {
      level {
        course
        _id
        level
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
