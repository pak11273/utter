const asyncTypes = {
  FETCH: "FETCH",
  LOAD: "LOAD",
  REQUEST: "REQUEST",
  CREATE: "CREATE",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
  RESET: "RESET"
}

// ie. typesString FETCH_USER_ASYNC will produce:
// FETCH_USER_ASYNC.FETCH
// FETCH_USER_ASYNC.LOAD
// FETCH_USER_ASYNC.REQUEST
// FETCH_USER_ASYNC.CREATE
// FETCH_USER_ASYNC.UPDATE
// FETCH_USER_ASYNC.DELETE
// FETCH_USER_ASYNC.SUCCESS
// FETCH_USER_ASYNC.ERROR
// FETCH_USER_ASYNC.RESET
export const createAsyncTypes = typeString =>
  Object.values(asyncTypes).reduce((acc, curr) => {
    acc[curr] = `${typeString}_${curr}`
    return acc
  }, {})

export const createAction = (type, payload = {}) => ({type, ...payload})

export const createReducer = (initialState, handlers) => (
  state = initialState,
  action
) =>
  handlers.hasOwnProperty(action.type)
    ? handlers[action.type](state, action)
    : state

export function reduceReducers(...reducers) {
  return (previous, current) =>
    reducers.reduce((p, r) => r(p, current), previous)
}

export function createConditionalSliceReducer(sliceName, fnMap) {
  // Create a reducer that knows how to handle one slice of state, with these action types
  const sliceReducer = createReducer({}, fnMap)

  // Create a new wrapping reducer
  return (state, action) => {
    // if (!state) {
    //   state = {
    //     test: null
    //   }
    // }
    // Check to see if this slice reducer knows how to handle this action
    if (fnMap[action.type]) {
      // If it does, pass the slice to the slice reducer, and update the slice
      return {
        ...state,
        [sliceName]: sliceReducer(state[sliceName], action)
      }
    }

    // Otherwise, return the existing state unchanged
    return state
  }
}
