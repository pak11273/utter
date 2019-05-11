import gql from "graphql-tag"

export const GET_VOCABULARIES = gql`
  query getVocabularies($level: ID!) {
    getVocabularies(level: $level) {
      vocabulary {
        _id
        audioUrl
        gender
        level
        keyword
        partsOfSpeech
        translation
        word
      }
    }
  }
`
