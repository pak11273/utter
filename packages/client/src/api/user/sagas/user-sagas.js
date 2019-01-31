import {browserHistory} from "react-router"
import {push} from "react-router-redux"
import {all, call, put, take, takeLatest} from "redux-saga/effects"
import axios from "axios"
import jwt from "jsonwebtoken"
import {actions} from "../actions/login-actions"

// actions
import * as types from "../types"

import {fetchData} from "../../../utils/apiMgr"
// import {SET_CURRENT_USER} from '../../api/user/actions.js'

export function* authorize(token) {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    localStorage.setItem("AUTH_TOKEN", token)
  } else {
    delete axios.defaults.headers.common["Authorization"]
  }
}

export function* deAuthorize() {
  localStorage.setItem("AUTH_TOKEN", null)
  delete axios.defaults.headers.common["Authorization"]
}

export function* login(state) {
  try {
    const {identifier, password} = state
    const url = "auth/signin"
    const method = "post"
    const data = {identifier, password}
    const cb = null
    const params = null

    /**
     * @param {string} url ex.'/my-courses/:owner/:courseId/:courseName'
     */
    const res = yield call(fetchData, {url, method, data, params, cb})

    // TODO may not need this
    // A `LOGOUT` action may happen while the `authorize` effect is going on, which may
    // lead to a race condition. This is unlikely, but just in case, we call `race` which
    // returns the "winner", i.e. the one that finished first
    // const winner = yield race({
    //   auth: call(authorize, {username, password, isRegistering: false}),
    //   logout: take(LOGOUT)
    // })

    if (res.status >= 200 && res.status < 300) {
      // yield put({SET_CURRENT_USER, res})
      yield put({
        type: types.LOGIN_ASYNC.SUCCESS,
        payload: res
      })
      const token = res.data.token

      yield call(authorize, token)
      yield put(push("/dashboard"))

      //TODO this may not belong
      const user = jwt.decode(token)
    } else {
      throw res
    }
  } catch (error) {
    if (!error.response) {
      yield put({
        type: types.LOGIN_ASYNC.ERROR,
        payload: error.message || "Something went wrong."
      })
    } else {
      const err = error.response.data.errors.form
      yield put({
        type: types.LOGIN_ASYNC.ERROR,
        payload: err
      })
    }
  } finally {
  }
}

export function* logout() {
  localStorage.removeItem("AUTH_TOKEN")
  localStorage.setItem("AUTH_TOKEN", null)
  yield put({type: types.DEAUTHORIZE})
  yield put(push("/login"))
  // dispatch(setCurrentUser({}))
}

function* watchLogin() {
  yield all([takeLatest(types.LOGIN_ASYNC.REQUEST, login)])
}

function* watchLogout() {
  yield all([takeLatest(types.LOGOUT, logout)])
}

function* watchDeAuthorize() {
  yield all([takeLatest(types.DEAUTHORIZE, deAuthorize)])
}

export default [watchDeAuthorize, watchLogin, watchLogout]
