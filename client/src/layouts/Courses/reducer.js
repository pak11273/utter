import {COURSE_LANGUAGE_FULFILLED} from './types'

export default (state = {}, action = {}) => {
  switch (action.type) {
    case COURSE_LANGUAGE_FULFILLED:
      return {
        ...state,
        courseLanguage: action.payload
      }
    default:
      return state
  }
}
