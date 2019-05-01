import gql from "graphql-tag"

export const COURSE_DELETE = gql`
  mutation courseDeleteMutation($resourceId: String!) {
    courseDelete(resourceId: $resourceId)
  }
`
export const COURSE_UPDATE = gql`
  mutation courseUpdate($_id: ID, $title: String, $courseDescription: String) {
    courseUpdate(
      input: {_id: $_id, title: $title, courseDescription: $courseDescription}
    ) {
      courseDescription
      courseImage
      courseMode
      title
      _id
      levels {
        _id
      }
      owner {
        _id
        username
      }
      resource
      subscribers
      teachingLang
      usingLang
    }
  }
`
