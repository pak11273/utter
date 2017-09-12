import {LOAD_FULFILLED, LOAD_QUERY_FULFILLED} from './types.js'

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
    default:
      return state
  }
}
