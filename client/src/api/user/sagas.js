import {browserHistory} from 'react-router'
import {push} from 'react-router-redux'
import {all, call, put, take, takeLatest} from 'redux-saga/effects'
import {showLoading, hideLoading} from 'react-redux-loading-bar'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import {actions} from './actions.js'

// actions
import * as types from './types'
import {DEAUTHORIZE} from './types'

import {fetchData} from '../../utils/apiMgr'
// import {SET_CURRENT_USER} from '../../api/user/actions.js'

export function* authorize(token) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    localStorage.setItem('jwtToken', token)
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
}

export function* deAuthorize() {
  localStorage.setItem('jwtToken', null)
  delete axios.defaults.headers.common['Authorization']
}

export function* login(state) {
  try {
    const {identifier, password} = state
    const url = 'auth/signin'
    const data = {identifier, password}
    const cb = null
    const params = null

    /**
     * @param {string} url ex.'/teaching-course/:courseCreatorId/:courseId/:courseName'
     */
    const res = yield call(fetchData, {url, data, params, cb})

    // TODO
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
      yield put(push('/dashboard'))

      //TODO
      const user = jwt.decode(token)
    } else {
      throw res
    }
  } catch (error) {
    console.log('errro: ', error)
    if (!error.response) {
      yield put({
        type: types.LOGIN_ASYNC.ERROR,
        payload: ''
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
  localStorage.removeItem('jwtToken')
  localStorage.setItem('jwtToken', null)
  yield put({type: DEAUTHORIZE})
  yield put(push('/login'))
  // dispatch(setCurrentUser({}))
}

function* watchLogin() {
  yield all([takeLatest(types.LOGIN_ASYNC.LOADING, login)])
}

function* watchLogout() {
  yield all([takeLatest('LOGOUT', logout)])
}

function* watchDeAuthorize() {
  yield all([takeLatest(DEAUTHORIZE, deAuthorize)])
}

export default [watchDeAuthorize, watchLogin, watchLogout]
