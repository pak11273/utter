import gql from "graphql-tag"

export const GET_ZONES = gql`
  query getZones(
    $app: String
    $cursor: String
    $searchInput: String
    $selectionBox: String
    $teachingLang: String!
    $usingLang: String!
  ) {
    getZones(
      input: {
        app: $app
        cursor: $cursor
        searchInput: $searchInput
        selectionBox: $selectionBox
        teachingLang: $teachingLang
        usingLang: $usingLang
      }
    ) {
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
export const ZONE_CREATE_MUTATION = gql`
  mutation zoneCreate(
    $ageGroup: String!
    $app: String
    $course: String
    $courseLevel: Int
    $owner: String!
    $zoneName: String!
    $zoneDescription: String
    $teachingLang: String
    $usingLang: String
  ) {
    zoneCreate(
      input: {
        ageGroup: $ageGroup
        app: $app
        course: $course
        courseLevel: $courseLevel
        owner: $owner
        zoneName: $zoneName
        zoneDescription: $zoneDescription
        teachingLang: $teachingLang
        usingLang: $usingLang
      }
    ) {
      _id
      app
      courseLevel
      ageGroup
      zoneName
      zoneDescription
      owner {
        username
      }
    }
  }
`
