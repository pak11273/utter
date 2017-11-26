import {ADD_MSG, LOAD_MSG_LIST, UPDATE_MSG, SET_CURRENT_MSG} from './types.js'

// The initial state of the App
const initialState = [
  {author: 'billy', msg: 'hello everyone'},
  {author: 'jake', msg: 'bye bye'}
]

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_MSG:
      return [
        ...state,
        {
          ...action.body
        }
      ]
    case LOAD_MSG_LIST:
      return [...state]
    case SET_CURRENT_MSG:
      return [
        ...state,
        {
          id: action.id,
          current_msg: action.current_msg
        }
      ]

    case UPDATE_MSG:
      return [
        ...state,
        {
          id: action.id,
          msg: action.msg
        }
      ]
    default:
      return state
  }
}
