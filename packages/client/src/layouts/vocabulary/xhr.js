import gql from "graphql-tag"

export const GET_VOCABULARIES = gql`
  query getVocabularies($level: ID!) {
    getVocabularies(level: $level) {
      vocabulary {
        _id
        audioUrl
        gender
        level
        translation
        word
      }
    }
  }
`

export const VOCABULARY_CREATE = gql`
  mutation vocabularyCreate(
    $audioUrl: String
    $gender: String
    $level: ID!
    $word: String
    $translation: String
  ) {
    vocabularyCreate(
      input: {
        audioUrl: $audioUrl
        gender: $gender
        level: $level
        word: $word
        translation: $translation
      }
    ) {
      vocabulary {
        _id
        audioUrl
        gender
        translation
        word
      }
      errors {
        message
      }
    }
  }
`

export const VOCABULARY_UPDATE = gql`
  mutation vocabularyUpdate(
    $_id: ID
    $audioUrl: String
    $gender: String
    $translation: String
    $word: String
  ) {
    vocabularyUpdate(
      input: {
        _id: $_id
        audioUrl: $audioUrl
        gender: $gender
        translation: $translation
        word: $word
      }
    ) {
      vocabulary {
        _id
        audioUrl
        gender
        translation
        word
      }
      errors {
        message
      }
    }
  }
`

export const VOCABULARY_DELETE = gql`
  mutation vocabularyDelete($_id: ID) {
    vocabularyDelete(_id: $_id) {
      vocabulary {
        _id
      }
      errors {
        path
        message
      }
    }
  }
`