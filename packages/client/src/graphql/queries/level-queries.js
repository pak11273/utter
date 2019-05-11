import gql from "graphql-tag"

export const GET_LEVEL = gql`
  query getLevel($levelId: String!) {
    getLevel(levelId: $levelId) {
      _id
      course
      title
      modifier
      vocabulary {
        _id
        audioUrl
        level
        gender
        keyword
        partsOfSpeech
        word
        translation
      }
    }
  }
`

export const GET_LEVELS = gql`
  query getLevels($courseId: String!) {
    getLevels(courseId: $courseId) {
      levels {
        _id
        course
        title
        modifier
      }
    }
  }
`
