import gql from "graphql-tag"

export const getLevels = gql`
  query getLevels($courseId: String!) {
    getLevels(courseId: $courseId) {
      levels {
        _id
        courseId
        level
        title
        vocabulary {
          audioUrl
          courseId
          _id
          gender
          level
          word
          translation
        }
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
        vocabulary {
          audioUrl
          courseId
          id
          gender
          level
          word
          translation
        }
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
