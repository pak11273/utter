import {LOAD_FULFILLED, ROOM_SELECT_FULFILLED} from './types.js'

export default (
  state = {
    selected: null,
    list: [],
    lastValues: []
  },
  action = {}
) => {
  switch (action.type) {
    case LOAD_FULFILLED:
      return {
        ...state,
        list: action.payload
      }
    case 'CREATE':
      break
    case 'UPDATE':
      break
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
