import {createReducer} from '../../../utils/reduxUtils.js'

import {LOAD_USERS_ASYNC} from './types.js'

const initialState = {
  loading: false
}

export default createReducer(initialState, {
  [LOAD_USERS_ASYNC.REQUEST]: state => ({
    ...state,
    loading: true
  }),
  [LOAD_USERS_ASYNC.ERROR]: (state, action) => ({
    ...state,
    errors: {
      message: action.payload
    },
    loading: false
  }),
  [LOAD_USERS_ASYNC.SUCCESS]: (state, action) => ({
    ...state,
    // ...action.payload,
    // username: action.payload.config.data,
    username: action.payload.username,
    email: action.payload.email,
    siteAdmin: action.payload.siteAdmin,
    errors: {},
    // isAuthenticated: true,
    loading: false
  })
})
