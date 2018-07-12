import {browserHistory} from 'react-router'
import {push} from 'react-router-redux'
import {all, call, put, take, takeLatest} from 'redux-saga/effects'
import {showLoading, hideLoading} from 'react-redux-loading-bar'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import {actions} from '../actions.js'

// actions
import {LOAD_USERS_ASYNC} from './types'

import {fetchData} from '../../../utils/apiMgr'

function* loadUsers() {
  console.log('hi')
  try {
    const {identifier, password} = state
    const url = 'api/users'
    const method = 'get'
    const data = {identifier, password}
    const cb = null
    const params = null

    const res = yield call(fetchData, {url, method, data, params, cb})

    if (res.status >= 200 && res.status < 300) {
      // yield put({SET_CURRENT_USER, res})
      yield put({
        type: types.LOAD_USERS_ASYNC.SUCCESS,
        payload: res
      })
      const token = res.data.token

      yield call(authorize, token)
      yield put(push('/dashboard'))

      //TODO this may not belong
      const user = jwt.decode(token)
    } else {
      throw res
    }
  } catch (error) {
    if (!error.response) {
      yield put({
        type: types.LOAD_USERS_ASYNC.ERROR,
        payload: error.message || 'Something went wrong.'
      })
    } else {
      const err = error.response.data.errors.form
      yield put({
        type: types.LOAD_USERS_ASYNC.ERROR,
        payload: err
      })
    }
  } finally {
  }
}

function* watchLoadUsers() {
  yield all([takeLatest(LOAD_USERS_ASYNC.REQUEST, loadUsers)])
}
