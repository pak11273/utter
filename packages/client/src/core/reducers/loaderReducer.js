import * as types from '../types.js'

const initialState = {
  loading: false
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case types.LOADER_ASYNC.CREATE:
      return {
        ...state,
        loading: true
      }
    case types.LOADER_ASYNC.DELETE:
      return {
        ...state,
        loading: false
      }
    case types.LOADER_ASYNC.RESET:
      return {
        ...state,
        loading: false
      }

    default:
      return state
  }
}
