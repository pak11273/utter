import {browserHistory} from 'react-router'
import {push} from 'react-router-redux'
import {all, call, put, take, takeLatest} from 'redux-saga/effects'
import {showLoading, hideLoading} from 'react-redux-loading-bar'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import {actions} from '../actions.js'

// actions
import * as types from './types'

import {fetchData} from '../../../utils/apiMgr'

function* loadUsers() {
  try {
    // const {identifier, password} = state
    const url = '/api/users'
    const method = 'get'
    // const data = {identifier, password}

    const res = yield call(fetchData, {
      url,
      method,
      data: null,
      params: null,
      cb: null
    })

    if (res.status >= 200 && res.status < 300) {
      yield put({
        type: types.LOAD_USERS_ASYNC.SUCCESS,
        payload: res
      })
      // const token = res.data.token
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
      // const err = error.response.data.errors.form
      const err = error.response.statusText
      yield put({
        type: types.LOAD_USERS_ASYNC.ERROR,
        payload: err
      })
    }
  } finally {
  }
}

function* watchLoadUsers() {
  yield all([takeLatest(types.LOAD_USERS_ASYNC.REQUEST, loadUsers)])
}

export default [watchLoadUsers]
