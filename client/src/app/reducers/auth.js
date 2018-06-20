import {LOAD_USER_PROFILE, SET_CURRENT_USER} from '../types.js'
import isEmpty from 'lodash/isEmpty'

const initialState = {
  isAuthenticated: false,
  user: {},
  userProfile: {}
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user
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
