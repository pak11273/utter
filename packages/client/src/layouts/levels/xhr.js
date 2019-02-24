import gql from "graphql-tag"

export const getLevels = gql`
  query getLevels($courseId: String!) {
    getLevels(courseId: $courseId) {
      levels {
        id
        courseId
        level
        title
      }
    }
  }
`

export const levelCreate = gql`
  mutation levelCreate($input: LevelCreateInput!) {
    levelCreate(input: $input) {
      level {
        courseId
        id
        level
        title
      }
      errors {
        message
      }
    }
  }
`

export const DELETE_LEVEL = gql`
  mutation levelDelete($courseId: String, $level: Int, $title: String) {
    levelDelete(courseId: $courseId, level: $level, title: $title) {
      level {
        courseId
        id
        level
        title
      }
      errors {
        path
        message
      }
    }
  }
`
