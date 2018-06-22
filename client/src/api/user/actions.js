// import jwt from 'jsonwebtoken'
// import {createAction} from '../../utils/reducerUtils.js'
import * as types from './types'
// import {SET_CURRENT_USER, LOAD_USER_PROFILE} from '../../app/types.js'
import {fetchData} from '../../utils/ApiMgr.js'

export function login(state) {
  return dispatch => {
    fetchData('api/users', state)
      .then(res => {
        const data = res.data
        // return {type: types.GET_USER_ASYNC.PENDING, payload: state}
        dispatch({type: 'LOAD_USER_SUCCESS', payload: data})
      })
      .catch(err => {
        console.log(err)
      })
  }
}

// export function loadUserSuccess(user) {
//   return {type: types.GET_USER_ASYNC.SUCCESS, user}
// }

// export function setCurrentUser(user) {
//   return {
//     type: SET_CURRENT_USER,
//     user
//   }
// }

// export const actions = {
//   pending: () => createAction(types.GET_USER_ASYNC.PENDING),
//   success: posts => createAction(types.GET_USER_ASYNC.SUCCESS, {posts}),
//   error: error => createAction(types.GET_USER_ASYNC.ERROR, {error})
// }

export function loadUserSuccess(user) {
  return {type: types.LOAD_USER_SUCCESS, user}
}
