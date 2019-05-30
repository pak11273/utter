import gql from "graphql-tag"

const COURSE_DELETE = gql`
  mutation courseDeleteMutation($resourceId: String!) {
    courseDelete(resourceId: $resourceId)
  }
`
const COURSE_UPDATE = gql`
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

const SUBSCRIBE_MUTATION = gql`
  mutation subscribe($courseId: String!, $userId: String) {
    subscribe(courseId: $courseId, userId: $userId) {
      _id
      title
    }
  }
`
const UNSUBSCRIBE_MUTATION = gql`
  mutation unsubscribe($courseId: String!, $userId: String) {
    unsubscribe(courseId: $courseId, userId: $userId)
  }
`

export {COURSE_DELETE, COURSE_UPDATE, SUBSCRIBE_MUTATION, UNSUBSCRIBE_MUTATION}
