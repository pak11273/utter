import {
  LOAD_UTTERED_LIST_FULFILLED,
  UPDATE_UTTERED_LIST_FULFILLED
} from './types.js'

export default (
  state = {
    utteredList: []
  },
  action = {}
) => {
  switch (action.type) {
    case LOAD_UTTERED_LIST_FULFILLED:
      return {
        ...state,
        utteredList: action.payload
      }
    case UPDATE_UTTERED_LIST_FULFILLED:
      return {
        ...state,
        utteredList: action.payload
      }
    default:
      return state
  }
}
