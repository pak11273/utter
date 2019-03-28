import gql from 'graphql-tag'

export const GET_ZONES = gql`
  query getZones(
    $cursor: String
		$searchInput: String
		$selectionBox: String
    $teachingLang: String!
    $usingLang: String!
  ) {
    getZones(
			input: {
				$cursor: String
				$searchInput: String
				$selectionBox: String
				$teachingLang: String!
				$usingLang: String!
			}
    ) {
      cursor
      zones {
        ageGroup
        app
        courseLevel
        _id
        owner {
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
