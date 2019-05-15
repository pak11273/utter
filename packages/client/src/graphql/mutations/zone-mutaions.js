import gql from "graphql-tag"
import {zoneFragment} from "../fragments/zone-fragments.js"

export const ZONE_CREATE_MUTATION = gql`
  mutation zoneCreate(
    $ageGroup: String!
    $app: String
    $course: String
    $courseLevel: String
    $owner: String!
    $private: Boolean
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
        private: $private
        password: $password
        zoneName: $zoneName
        zoneDescription: $zoneDescription
        teachingLang: $teachingLang
        usingLang: $usingLang
      }
    ) {
      ...ZoneInfo
    }
  }
  ${zoneFragment}
`

export const ZONE_DELETE = gql`
  mutation zoneDelete($_id: String!) {
    zoneDelete(_id: $_id)
  }
`
