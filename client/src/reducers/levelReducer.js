import {LOAD_ROOM_LEVEL_FULFILLED} from '../actions/types.js'

export default (
  state = {
    roomLevel: 1
  },
  action = {}
) => {
  switch (action.type) {
    case LOAD_ROOM_LEVEL_FULFILLED:
      return {
        ...state,
        roomLevel: action.payload
      }
    default:
      return state
  }
}
