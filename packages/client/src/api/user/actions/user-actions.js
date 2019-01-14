import jwt from "jsonwebtoken"
import axios from "axios"
import {
  // CHANGE_FORM,
  // SET_AUTH,
  // SENDING_REQUEST,
  // LOGIN_REQUEST,
  // REGISTER_REQUEST,
  LOAD_USER_PROFILE,
  LOGIN_ASYNC,
  LOGOUT,
  // REQUEST_ERROR,
  // CLEAR_ERROR
  SET_CURRENT_USER
} from "../types.js"

import {createAction} from "../../../utils/redux-utils.js"

// import {SET_CURRENT_USER, LOAD_USER_PROFILE} from '../../app/types.js'
// import {fetchData} from '../../utils/apiMgr'

// export function setCurrentUser(user) {
//   return {
//     type: SET_CURRENT_USER,
//     user
//   }
// }
//

// export function loadUserProfile(payload) {
//   return dispatch => {
//     return {
//       type: LOAD_USER_PROFILE,
//       payload
//     }
//   }
// }

// get user
// export function getUser(state) {
//   const url = 'auth/signin'
// return dispatch => {
//   fetchData(url, state).then(res => {
//     const token = res.data.token
//     localStorage.setItem('jwtToken', token)
//     setAuthorizationToken(token)
//     const user = jwt.decode(token)
//     // dispatch(setCurrentUser(user))
//     // sample id; "59d2a7bb24a8b73675b527d7"
//     return axios.get(`api/users/${user._id}`).then(res => {
//       console.log('ge asyuct: ', LOGIN_ASYNC.REQUEST)
//       // dispatch({type: LOGIN_ASYNC.REQUEST, payload: res.data})
//       // dispatch({type: LOGIN_ASYNC.SUCCESS, payload: res.data})
//       // dispatch(loadUserProfile(res.data))
//     })
//   })
// }
// }

// export function setCurrentUser(user) {
//   return {
//     type: SET_CURRENT_USER,
//     user
//   }
// }

// export function loadUserSuccess(user) {
//   return {type: LOAD_USER_SUCCESS, user}
// }

/**
 * Sets the form state
 * @param  {object} newFormState          The new state of the form
 * @param  {string} newFormState.username The new text of the username input field of the form
 * @param  {string} newFormState.password The new text of the password input field of the form
 */
// export function changeForm(newFormState) {
//   return {type: CHANGE_FORM, newFormState}
// }

/**
 * Sets the authentication state of the application
 * @param  {boolean} newAuthState True means a user is logged in, false means no user is logged in
 */
// export function setAuthState(newAuthState) {
//   return {type: SET_AUTH, newAuthState}
// }

/**
 * Sets the `currentlySending` state, which displays a loading indicator during requests
 * @param  {boolean} sending True means we're sending a request, false means we're not
 */
// export function sendingRequest(sending) {
//   return {type: SENDING_REQUEST, sending}
// }

/**
 * Tells the app we want to log in a user
 * @param  {object} data          The data we're sending for log in
 * @param  {string} data.username The username of the user to log in
 * @param  {string} data.password The password of the user to log in
 */

// export function login(data) {
//   return {type: LOGIN_REQUEST, data}
// }

/**
 * Tells the app we want to log out a user
 */
// export function logout() {
//   return {type: LOGOUT}
// }

/**
 * Tells the app we want to register a user
 * @param  {object} data          The data we're sending for registration
 * @param  {string} data.username The username of the user to register
 * @param  {string} data.password The password of the user to register
 */
// export function registerRequest(data) {
//   return {type: REGISTER_REQUEST, data}
// }

/**
 * Sets the `error` state to the error received
 * @param  {object} error The error we got when trying to make the request
 */
// export function requestError(error) {
//   return {type: REQUEST_ERROR, error}
// }

/**
 * Sets the `error` state as empty
 */
// export function clearError() {
//   return {type: CLEAR_ERROR}
// }

export function resetpassword(data) {
  return dispatch => {
    return axios.post("/mail/reset-password", data)
  }
}

// export function logout() {
//   return dispatch => {
//     localStorage.removeItem('jwtToken')
//     dispatch(setCurrentUser({}))
//   }
// }

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

export default {
  request: state => createAction(LOGIN_ASYNC.REQUEST, state),
  success: posts => createAction(LOGIN_ASYNC.SUCCESS, {user}),
  error: error => createAction(LOGIN_ASYNC.ERROR, error),
  reset: () => createAction(LOGIN_ASYNC.RESET),
  logout: () => createAction(LOGOUT)
}
