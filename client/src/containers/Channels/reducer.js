import {
  CHANNEL_SELECT_FULFILLED,
  LOAD_FULFILLED,
  LOAD_CHANNEL_ID_FULFILLED,
  SORT_FULFILLED,
  SET_CHANNEL_SOCKET_FULFILLED
} from './types.js'

export default (
  state = {channelId: null, channels: [], selected: ''},
  action = {}
) => {
  switch (action.type) {
    case CHANNEL_SELECT_FULFILLED:
      return {
        ...state,
        selected: action.payload
      }
    case LOAD_CHANNEL_ID_FULFILLED:
      return {
        ...state,
        channelId: action.payload
      }
    case LOAD_FULFILLED:
      return {
        ...state,
        channels: action.payload
      }
    case SET_CHANNEL_SOCKET_FULFILLED:
      return {
        ...state,
        socket: action.payload
      }
    case SORT_FULFILLED:
      return {
        ...state,
        sorting: action.payload
      }
    default:
      return state
  }
}
