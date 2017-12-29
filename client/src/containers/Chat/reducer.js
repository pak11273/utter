import {ADD_MSG, LOAD_MSG_LIST, UPDATE_MSG, SET_CURRENT_MSG} from './types.js'

// The initial state of the App
const initialState = {msgList: []}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_MSG:
      return {
        ...state,
        msgList: [
          ...state.msgList,
          {
            ...action.body
          }
        ]
      }
    case LOAD_MSG_LIST:
      return {
        ...state,
        msgList: [...state.msgList]
      }
    case SET_CURRENT_MSG:
      return {
        ...state,
        msgList: [
          ...state.msgList,
          {
            id: action.id,
            current_msg: action.current_msg
          }
        ]
      }
    case UPDATE_MSG:
      return {
        ...state,
        msgList: [
          ...state.msgList,
          {
            id: action.id,
            msg: action.msg
          }
        ]
      }
    default:
      return state
  }
}
