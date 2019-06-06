import gql from "graphql-tag"

export const zoneFragment = gql`
  fragment ZoneInfo on Zone {
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
    zoneName
  }
`
