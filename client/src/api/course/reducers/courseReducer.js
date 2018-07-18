import {createReducer} from '../../../utils/reduxUtils.js'
import {COURSE_ASYNC} from '../types.js'

const initialState = {
  loading: false,
  errors: {
    message: ''
  }
}

export default createReducer(initialState, {
  [COURSE_ASYNC.REQUEST]: state => ({
    ...state,
    loading: true
  }),
  [COURSE_ASYNC.SUCCESS]: (state, action) => ({
    ...state,
    ...action.payload,
    errors: {},
    loading: false
  }),
  [COURSE_ASYNC.ERROR]: (state, action) => ({
    ...state,
    errors: {
      message: action.payload
    },
    loading: false
  }),
  [COURSE_ASYNC.RESET]: state => ({
    ...state,
    loading: false,
    errors: {}
  })
})
