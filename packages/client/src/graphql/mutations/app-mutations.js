import gql from "graphql-tag"

export const APP_INIT = gql`
  mutation appInit(
    $app: String
    $host: String
    $levelId: String
    $modifier: String
    $zoneId: String
  ) {
    appInit(
      input: {
        app: $app
        host: $host
        levelId: $levelId
        modifier: $modifier
        zoneId: $zoneId
      }
    ) {
      _id
      level
      gender
      keyword
      partsOfSpeech
      translation
      word
      webformatHeight
      webformatWidth
      webformatURL
    }
  }
`
