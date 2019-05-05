import gql from "graphql-tag"

export const GET_ZONES = gql`
  query getZones(
    $app: String
    $subscriptions: String
    $cursor: String
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
        cursor: $cursor
        page: $page
        searchInput: $searchInput
        selectionBox: $selectionBox
        teachingLang: $teachingLang
        usingLang: $usingLang
      }
    ) {
      page
      cursor
      more
      zones {
        ageGroup
        app
        zoneCourse {
          title
          usingLang
          teachingLang
        }
        course {
          _id
        }
        courseLevel
        _id
        owner {
          _id
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
