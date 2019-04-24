import gql from "graphql-tag"

export const GET_VOCABULARIES = gql`
  query getVocabularies($level: ID!) {
    getVocabularies(level: $level) {
      vocabulary {
        _id
        audioUrl
        gender
        level
        partsOfSpeech
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
    $partsOfSpeech: String
    $translation: String
    $word: String
  ) {
    vocabularyCreate(
      input: {
        audioUrl: $audioUrl
        gender: $gender
        level: $level
        partsOfSpeech: $partsOfSpeech
        translation: $translation
        word: $word
      }
    ) {
      vocabulary {
        _id
        audioUrl
        gender
        partsOfSpeech
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
    $partsOfSpeech: String
    $word: String
  ) {
    vocabularyUpdate(
      input: {
        _id: $_id
        audioUrl: $audioUrl
        gender: $gender
        partsOfSpeech: $partsOfSpeech
        translation: $translation
        word: $word
      }
    ) {
      vocabulary {
        _id
        audioUrl
        gender
        partsOfSpeech
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
  mutation vocabularyDelete($_id: ID, $public_id: String) {
    vocabularyDelete(_id: $_id, public_id: $public_id) {
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

export const VOCABULARY_AUDIO_SAVE = gql`
  mutation vocabularyAudioSave($_id: ID, $audioUrl: String, $tags: [String]) {
    vocabularyAudioSave(_id: $_id, audioUrl: $audioUrl, tags: $tags) {
      vocabulary {
        _id
        level
      }
      errors {
        path
        message
      }
    }
  }
`
export const VOCABULARY_AUDIO_DELETE = gql`
  mutation vocabularyAudioDelete($_id: ID, $public_id: String) {
    vocabularyAudioDelete(_id: $_id, public_id: $public_id) {
      vocabulary {
        _id
        level
      }
      errors {
        path
        message
      }
    }
  }
`
