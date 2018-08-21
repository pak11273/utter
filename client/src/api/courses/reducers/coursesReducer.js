import {createReducer} from '../../../utils/reduxUtils.js'
import {COURSES_ASYNC} from '../types.js'

const initialState = {
  loading: false,
  errors: {
    message: ''
  }
}

export default createReducer(initialState, {
  [COURSES_ASYNC.REQUEST]: state => ({
    ...state,
    loading: true
  }),
  [COURSES_ASYNC.SUCCESS]: (state, action) => ({
    ...state,
    ...action.payload,
    errors: {},
    loading: false
  }),
  [COURSES_ASYNC.ERROR]: (state, action) => ({
    ...state,
    errors: {
      message: action.payload
    },
    loading: false
  }),
  [COURSES_ASYNC.RESET]: state => ({
    ...state,
    loading: false,
    errors: {}
  })
})
