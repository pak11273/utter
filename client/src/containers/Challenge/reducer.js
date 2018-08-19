import {LOAD_QUESTION_FULFILLED} from './types.js'

export default (state = {}, action = {}) => {
  switch (action.type) {
    case LOAD_QUESTION_FULFILLED:
      return {
        ...state,
        question: action.payload
      }
    default:
      return state
  }
}
