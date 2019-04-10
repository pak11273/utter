import gql from "graphql-tag"

export const GET_VOCABULARIES = gql`
  query getVocabularies($levelId: ID) {
    getVocabularies(levelId: $levelId) {
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
    $level: Int
    $levelId: ID
    $word: String
    $translation: String
  ) {
    vocabularyCreate(
      input: {
        audioUrl: $audioUrl
        gender: $gender
        level: $level
        levelId: $levelId
        word: $word
        translation: $translation
      }
    ) {
      vocabulary {
        levelId
        _id
        word
      }
      errors {
        message
      }
    }
  }
`

export const VOCABULARY_UPDATE = gql`
  mutation vocabularyUpdate($_id: ID, $word: String) {
    vocabularyUpdate(input: {_id: $_id, word: $word}) {
      vocabulary {
        levelId
        _id
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
