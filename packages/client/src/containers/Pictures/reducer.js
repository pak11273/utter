import {
  LOAD_AUDIO_URL_FULFILLED,
  LOAD_PICTURE_SRC_FULFILLED,
  LOAD_QUERY_FULFILLED,
  LOAD_QUESTION_FULFILLED,
  LOAD_WORD_LIST_FULFILLED,
  LOAD_ORIGINAL_WORD_LIST_FULFILLED,
  UPDATE_ORIGINAL_WORD_LIST_FULFILLED,
  UPDATE_PICTURE_FULFILLED,
  // UPDATE_QUERY_FULFILLED,
  UPDATE_TRANSLATION_FULFILLED,
  UPDATE_WORD_LIST_FULFILLED,
  UPDATE_REVIEW_LIST_FULFILLED,
  SEND_ROMANIZED_FULFILLED,
  SEND_TRANSLATED_FULFILLED
} from './types.js'

export default (state = {reviewList: []}, action = {}) => {
  switch (action.type) {
    case LOAD_AUDIO_URL_FULFILLED:
      return {
        ...state,
        audioUrl: action.payload
      }
    case LOAD_QUESTION_FULFILLED:
      return {
        ...state,
        question: action.payload
      }
    case LOAD_QUERY_FULFILLED:
      return {
        ...state,
        query: action.payload
      }
    case LOAD_WORD_LIST_FULFILLED:
      return {
        ...state,
        wordList: action.payload
      }
    case LOAD_ORIGINAL_WORD_LIST_FULFILLED:
      return {
        ...state,
        originalList: action.payload
      }
    case SEND_ROMANIZED_FULFILLED:
      return {
        ...state,
        romanized: action.payload
      }
    case SEND_TRANSLATED_FULFILLED:
      return {
        ...state,
        translation: action.payload
      }
    case UPDATE_ORIGINAL_WORD_LIST_FULFILLED:
      return {
        ...state,
        originalList: action.payload
      }
    case UPDATE_PICTURE_FULFILLED:
      return {
        ...state,
        pictureSrc: action.payload
      }
    // case UPDATE_QUERY_FULFILLED:
    //   return {
    //     ...state,
    //     query: action.payload
    //   }
    case UPDATE_TRANSLATION_FULFILLED:
      return {
        ...state,
        translation: action.payload
      }
    case UPDATE_WORD_LIST_FULFILLED:
      return {
        ...state,
        wordList: action.payload
      }
    case UPDATE_REVIEW_LIST_FULFILLED:
      return {
        ...state,
        reviewList: [...state.reviewList, action.payload]
      }
    default:
      return state
  }
}
