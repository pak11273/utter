import axios from 'axios'
import jwt from 'jsonwebtoken'
import {fetchData} from '../../utils/apiMgr'
import setAuthorizationToken from '../../utils/setAuthorizationToken.js'
import {SET_CURRENT_USER, LOAD_USER_PROFILE} from '../types.js'

export function forgotpassword(data) {
  return dispatch => {
    return axios.post('/mail/forgot-password', data)
  }
}

export function resetpassword(data) {
  return dispatch => {
    return axios.post('/mail/reset-password', data)
  }
}

export function logout() {
  return dispatch => {
    localStorage.removeItem('jwtToken')
    setAuthorizationToken(false)
    dispatch(setCurrentUser({}))
  }
}

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  }
}

export function loadUserProfile(payload) {
  return {
    type: LOAD_USER_PROFILE,
    payload
  }
}

export function loadUserSuccess(user) {
  return {type: types.LOAD_USER_SUCCESS, user}
}

export function login(data) {
  const url = 'auth/signin'
  return dispatch => {
    return fetchData(url, data).then(res => {
      const token = res.data.token
      localStorage.setItem('jwtToken', token)
      setAuthorizationToken(token)
      const user = jwt.decode(token)
      dispatch(setCurrentUser(user))
      // sample id; "59d2a7bb24a8b73675b527d7"
      axios.get(`api/users/${user._id}`).then(res => {
        dispatch(loadUserProfile(res.data))
      })
    })
  }
}
