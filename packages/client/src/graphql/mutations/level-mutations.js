import gql from "graphql-tag"

export const LEVEL_CREATE = gql`
  mutation levelCreate($courseId: String, $title: String, $modifier: String) {
    levelCreate(
      input: {courseId: $courseId, title: $title, modifier: $modifier}
    ) {
      level {
        course
        _id
        title
        modifier
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
  mutation levelUpdate($_id: ID, $title: String, $modifier: String) {
    levelUpdate(input: {_id: $_id, title: $title, modifier: $modifier}) {
      level {
        course
        _id
        title
        modifier
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
