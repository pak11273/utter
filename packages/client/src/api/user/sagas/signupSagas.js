import {browserHistory} from "react-router"
import {push} from "react-router-redux"
import {all, call, put, take, takeLatest} from "redux-saga/effects"
import axios from "axios"
import jwt from "jsonwebtoken"
import {actions} from "../actions/signupActions.js"
import {request as login} from "../actions/login-actions.js"
import {AUTH_TOKEN} from "../../../layouts/Login/containers/constants.js"

// actions
import * as types from "../types"
import {ADD_FLASH_MESSAGE} from "../../../app/types.js"

import {fetchData} from "../../../utils/apiMgr"
// import {SET_CURRENT_USER} from '../../api/user/actions.js'

export function* authorize(token) {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    localStorage.setItem(AUTH_TOKEN, token)
  } else {
    delete axios.defaults.headers.common["Authorization"]
  }
}

export function* deAuthorize() {
  localStorage.setItem("jwtToken", null)
  delete axios.defaults.headers.common["Authorization"]
}

export function* signup(state) {
  try {
    const {username, email, password} = state
    const url = "api/users"
    const method = "post"
    const data = {username, email, password}
    const cb = null
    const params = null

    /**
     * @param {object} data
     */
    const res = yield call(fetchData, {url, method, data, params, cb})

    if (res.status >= 200 && res.status < 300) {
      // yield put({SET_CURRENT_USER, res})
      yield put({
        type: types.SIGNUP_ASYNC.SUCCESS,
        payload: res
      })

      // yield put({
      //   type: types.SIGNUP_ASYNC.RESET
      // })

      const token = res.data.token
      const identifier = data.username || data.eamil
      const formattedData = {...data, identifier}

      yield put({
        type: types.LOGIN_ASYNC.REQUEST,
        ...formattedData
      })

      //TODO implement
      yield put({
        type: ADD_FLASH_MESSAGE,
        text: "You signed up successfully. Welcome aboard."
      })
    } else {
      throw res
    }
  } catch (error) {
    if (!error.response) {
      yield put({
        type: types.SIGNUP_ASYNC.ERROR,
        payload: error.message || "Something went wrong."
      })
    } else {
      yield put({
        type: types.SIGNUP_ASYNC.ERROR,
        payload: error.response.data.errors
      })
    }
  } finally {
  }
}

function* watchSignup() {
  yield all([takeLatest(types.SIGNUP_ASYNC.REQUEST, signup)])
}

function* watchDeAuthorize() {
  yield all([takeLatest(types.DEAUTHORIZE, deAuthorize)])
}

export default [watchDeAuthorize, watchSignup]
