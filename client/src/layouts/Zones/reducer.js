import {LOAD_USER_PROFILE, ADD_COURSE} from './types.js'

export default (state = {}, action = {}) => {
  switch (action.type) {
    case ADD_COURSE:
      return {
        ...state
      }
    case LOAD_USER_PROFILE:
      return {
        ...state,
        userProfile: action.payload
      }
    default:
      return state
  }
}
