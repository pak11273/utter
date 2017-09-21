import {
  LOAD_FULFILLED,
  LOAD_QUERY_FULFILLED,
  LOAD_WORD_LIST_FULFILLED,
  LOAD_ORIGINAL_WORD_LIST_FULFILLED,
  UPDATE_WORD_LIST_FULFILLED,
  UPDATE_REVIEW_LIST_FULFILLED,
  SEND_ROMANIZED_FULFILLED,
  SEND_TRANSLATED_FULFILLED
} from './types.js'

export default (state = {}, action = {}) => {
  switch (action.type) {
    case LOAD_FULFILLED:
      return {
        ...state,
        pictureSRC: action.payload
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
    case UPDATE_WORD_LIST_FULFILLED:
      return {
        ...state,
        wordList: action.payload
      }
    case UPDATE_REVIEW_LIST_FULFILLED:
      return {
        ...state,
        reviewList: action.payload
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
    default:
      return state
  }
}
