import {TOGGLE_FOOTER} from '../types.js'

const initialState = {
  toggle: true
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case TOGGLE_FOOTER:
      return {
        toggle: action.bool
      }
    default:
      return state
  }
}
