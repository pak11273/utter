import {LOAD_USER_PROFILE} from './types.js'

export default (state = {}, action = {}) => {
  switch (action.type) {
    case LOAD_USER_PROFILE:
      return {
        ...state,
        userProfile: action.payload
      }
    default:
      return state
  }
}
