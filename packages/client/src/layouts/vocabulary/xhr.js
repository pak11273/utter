import gql from "graphql-tag"

export const getVocabularies = gql`
  query getVocabularies($level: Int) {
    getVocabularies(level: $level) {
      id
      word
      translation
    }
  }
`

export const vocabularyCreate = gql`
  mutation vocabularyCreate($input: VocabularyCreateInput!) {
    vocabularyCreate(input: $input) {
      vocabulary {
        audioUrl
        courseId
        gender
        level
        translation
        word
      }
      errors {
        message
      }
    }
  }
`

export const DELETE_LEVEL = gql`
  mutation vocabularyDelete($word: String, $translation: String) {
    vocabularyDelete(word: $word, translation: $translation) {
      vocabulary {
        id
        word
        translation
      }
      errors {
        path
        message
      }
    }
  }
`
