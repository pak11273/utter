import {
  LOAD_LIST_TYPE_FULFILLED,
  UPDATE_LIST_TYPE_FULFILLED,
  ROOM_SELECT_FULFILLED,
  UPDATE_ROOM_CREATOR_FULFILLED,
  UPDATE_CURRENT_ROOM_FULFILLED,
  UPDATE_ROOM_LANGUAGE_FULFILLED,
  UPDATE_ROOM_LEVEL_FULFILLED,
  UPDATE_ROOM_TITLE_FULFILLED
} from './types.js'

export default (
  state = {
    creator: '',
    currentRoom: null,
    language: 'spanish',
    lastValues: [],
    listType: 'letters',
    roomLevel: 0,
    roomTitle: '',
    selected: ''
  },
  action = {}
) => {
  switch (action.type) {
    case ROOM_SELECT_FULFILLED:
      return {
        ...state,
        selected: action.payload
      }
    case LOAD_LIST_TYPE_FULFILLED:
      return {
        ...state,
        listType: action.payload
      }
    case UPDATE_CURRENT_ROOM_FULFILLED:
      return {
        ...state,
        currentRoom: action.payload
      }
    case UPDATE_LIST_TYPE_FULFILLED:
      return {
        ...state,
        listType: action.payload
      }
    case UPDATE_ROOM_CREATOR_FULFILLED:
      return {
        ...state,
        creator: action.payload
      }
    case UPDATE_ROOM_LANGUAGE_FULFILLED:
      return {
        ...state,
        language: action.payload
      }
    case UPDATE_ROOM_LEVEL_FULFILLED:
      return {
        ...state,
        roomLevel: action.payload
      }
    case UPDATE_ROOM_TITLE_FULFILLED:
      return {
        ...state,
        roomTitle: action.payload
      }
    case 'REMOVE':
      break
    // an example  of es6 spread operating on an array
    // case 'ARRAY SPREAD EXAMPLE':
    //   state = {
    //     ...state,
    //     result: state.result + action.payload,
    //     lastValues: [...state.lastValues, action.payload]
    //   }
    // break
    default:
      return state
  }
}
