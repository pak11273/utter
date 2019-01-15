import {CONTACT_LOADING, CONTACT_SUCCESS} from "./types.js"

const initialState = {
  loading: false
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case CONTACT_LOADING:
      return {
        loading: true
      }
    case CONTACT_SUCCESS:
      return {
        loading: false
      }
    default:
      return state
  }
}
