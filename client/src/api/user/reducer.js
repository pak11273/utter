import {createReducer} from '../../utils/reducerUtils.js'
import * as types from './types'

const initialState = {}

export default createReducer(initialState, {
  [types.GET_USER_ASYNC.PENDING]: state => ({
    ...state,
    loading: true
  }),
  [types.GET_USER_ASYNC.SUCCESS]: (state, action) => ({
    ...state,
    posts: action.posts,
    loading: false
  }),
  [types.GET_USER_ASYNC.ERROR]: state => ({
    ...state,
    loading: false
  })
})
