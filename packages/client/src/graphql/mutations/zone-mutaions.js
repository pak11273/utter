import gql from "graphql-tag"

export const ZONE_CREATE_MUTATION = gql`
  mutation zoneCreate(
    $ageGroup: String!
    $app: String
    $course: String
    $courseLevel: String
    $owner: String!
    $reserved: Boolean
    $password: String
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
        reserved: $reserved
        password: $password
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
			password
			reserved
    }
  }
`
