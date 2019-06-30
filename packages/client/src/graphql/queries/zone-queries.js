import gql from "graphql-tag"

export const GET_ZONES = gql`
  query getZones(
    $app: String
    $subscriptions: String
    $page: Int
    $searchInput: String
    $selectionBox: String
    $teachingLang: String!
    $usingLang: String!
  ) {
    getZones(
      input: {
        app: $app
        subscriptions: $subscriptions
        page: $page
        searchInput: $searchInput
        selectionBox: $selectionBox
        teachingLang: $teachingLang
        usingLang: $usingLang
      }
    ) {
      page
      more
      zones {
        maxMembers
        members
        ageGroup
        app
        course {
          _id
          title
        }
        courseLevel
        _id
        owner {
          _id
          username
        }
        ownerCourse {
          _id
          username
        }
        teachingLang
        usingLang
        zoneDescription
        zoneImage
        zoneName
      }
    }
  }
`
export const REZONE = gql`
  query rezone($username: String) {
    rezone(username: $username) {
      _id
      app
      course {
        _id
      }
      courseLevel
      ageGroup
      zoneName
      zoneDescription
      owner {
        username
      }
      password
      private
      teachingLang
      usingLang
    }
  }
`
