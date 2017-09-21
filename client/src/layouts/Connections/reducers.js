import {LOAD_USER_PROFILE_FULFILLED} from './types.js'

export default (state = {}, action = {}) => {
  switch (action.type) {
    case LOAD_USER_PROFILE_FULFILLED:
      return {
        ...state,
        userProfile: action.payload
      }
    default:
      return state
  }
}
