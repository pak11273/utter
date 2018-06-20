import {fetchData} from '../../utils/ApiMgr.js'
import jwt from 'jsonwebtoken'
import * as types from './types'
import {SET_CURRENT_USER, LOAD_USER_PROFILE} from '../../app/types.js'
import {GET_USER_ASYNC} from '../../api/user/types.js'
import setAuthorizationToken from '../../utils/setAuthorizationToken.js'

export function loadUserSuccess(user) {
  return {type: types.LOAD_USER_SUCCESS, user}
}

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  }
}

export function login(data) {
  const url = 'auth/signin'
  const params = null
  const cb = null
  return (dispatch, getState) => {
    // example url: '/teaching-course/:courseCreatorId/:courseId/:courseName')
    fetchData(url, data, params, cb).then(res => {
      console.log('res: ', res)
      const token = res.data.token
      localStorage.setItem('jwtToken', token)
      setAuthorizationToken(token)
      dispatch({
        type: GET_USER_ASYNC.SUCCESS,
        payload: res
      })
      const user = jwt.decode(token)
      dispatch(setCurrentUser(user))
      // sample id; "59d2a7bb24a8b73675b527d7"
      // axios.get(`api/users/${user._id}`).then(res => {
      //   dispatch(loadUserProfile(res.data))
      // })
    })
  }
}
