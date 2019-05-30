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
      resource
      usingLang
      teachingLang
      owner {
        username
        subscriptions {
          _id
        }
      }
    }
  }
`

export const GET_COURSES = gql`
  query getCourses(
    $page: Int
    $searchInput: String
    $selectionBox: String
    $usingLang: String!
    $teachingLang: String!
  ) {
    getCourses(
      input: {
        page: $page
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
          title
        }
        resource
        usingLang
        subscriberCount
        teachingLang
        owner {
          username
          subscriptions {
            _id
          }
        }
      }
      page
      more
    }
  }
`

export const GET_CREATED_COURSES = gql`
  query getCreatedCourses($cursor: String) {
    getCreatedCourses(cursor: $cursor) {
      courses {
        _id
        courseImage
        courseMode
        title
        courseDescription
        levels {
          _id
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
      more
    }
  }
`
