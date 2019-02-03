import {createReducer} from "../../../utils/redux-utils.js"
import {ZONES_ASYNC} from "../types.js"

const initialState = {
  loading: false,
  errors: {
    message: ""
  }
}

export default createReducer(initialState, {
  [ZONES_ASYNC.REQUEST]: state => ({
    ...state,
    loading: true
  }),
  [ZONES_ASYNC.SUCCESS]: (state, action) => ({
    ...state,
    ...action.payload,
    errors: {},
    loading: false
  }),
  [ZONES_ASYNC.ERROR]: (state, action) => ({
    ...state,
    errors: {
      message: action.payload
    },
    loading: false
  }),
  [ZONES_ASYNC.RESET]: state => ({
    ...state,
    loading: false,
    next: "",
    errors: {}
  })
})
