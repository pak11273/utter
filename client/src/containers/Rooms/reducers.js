import {
  LOAD_FULFILLED,
  LOAD_LIST_TYPE_FULFILLED,
  UPDATE_LIST_TYPE_FULFILLED,
  ROOM_SELECT_FULFILLED,
  UPDATE_ROOM_LANGUAGE_FULFILLED,
  UPDATE_ROOM_LEVEL_FULFILLED
} from './types.js'

export default (
  state = {
    roomLevel: 1,
    language: 'spanish',
    lastValues: [],
    list: [],
    listType: 'letters',
    selected: ''
  },
  action = {}
) => {
  switch (action.type) {
    case LOAD_FULFILLED:
      return {
        ...state,
        list: action.payload
      }
    case LOAD_LIST_TYPE_FULFILLED:
      return {
        ...state,
        listType: action.payload
      }
    case UPDATE_LIST_TYPE_FULFILLED:
      return {
        ...state,
        listType: action.payload
      }
    case 'CREATE':
      break
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
    case ROOM_SELECT_FULFILLED:
      return {
        ...state,
        selected: action.payload
      }
    default:
      return state
  }
}
