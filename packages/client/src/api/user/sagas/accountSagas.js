import {push} from 'react-router-redux'
import {all, call, put, select, take, takeLatest} from 'redux-saga/effects'
import axios from 'axios'
import {fetchData} from '../../../utils/apiMgr'
import {ADD_FLASH_MESSAGE} from '../../../app/types.js'

// types
import * as types from '../types'
import {LOADER_ASYNC} from '../types'

export function* fetchUser(state) {
  const getAuthId = state => state.apiReducer.User.items[0]
  const authId = yield select(getAuthId)
  const url = `/api/users/${authId}`
  const htmlReadyUrl = encodeURI(url)

  try {
    const url = htmlReadyUrl
    const method = 'get'
    const data = {}
    const cb = null
    const params = null

    yield put({
      type: types.LOADER_ASYNC.CREATE
    })

    const res = yield call(fetchData, {url, method, data, params, cb})

    if (res.status >= 200 && res.status < 300) {
      yield put({
        type: types.ACCOUNT_ASYNC.SUCCESS,
        payload: res.data
      })

      yield put({
        type: types.LOADER_ASYNC.DELETE
      })

      yield put({
        type: ADD_FLASH_MESSAGE,
        message: {
          type: 'success',
          text: 'Your account was updated successfully.'
        }
      })

      yield put(push(`/settings`))
    } else {
      throw res
    }
  } catch (error) {
    if (!error.response) {
      yield put({
        type: types.ACCOUNT_ASYNC.ERROR,
        payload: error.message || 'Something went wrong.'
      })
    } else {
      console.log('error: ', error.response.statusText)
      const err = error.response.statusText
      yield put({
        type: types.ACCOUNT_ASYNC.ERROR,
        payload: err
      })
    }
  } finally {
  }
}

export function* updateAccount(state) {
  const getAuthId = state => state.apiReducer.User.items[0]
  const authId = yield select(getAuthId)
  const url = `/api/users/${authId}`
  const htmlReadyUrl = encodeURI(url)
  try {
    const url = htmlReadyUrl
    const method = 'put'
    const data = state
    const cb = null
    const params = null

    const res = yield call(fetchData, {url, method, data, params, cb})

    if (res.status >= 200 && res.status < 300) {
      yield put({
        type: types.ACCOUNT_ASYNC.SUCCESS,
        payload: res.data
      })

      yield call(fetchUser, res.data.username)

      // yield put(push(`/course/${courseId}/${courseName}/edit`))
    } else {
      throw res
    }
  } catch (error) {
    if (!error.response) {
      yield put({
        type: types.ACCOUNT_ASYNC.ERROR,
        payload: error.message || 'Something went wrong.'
      })
    } else {
      console.log('error: ', error.response.statusText)
      const err = error.response.statusText
      yield put({
        type: types.ACCOUNT_ASYNC.ERROR,
        payload: err
      })
    }
  } finally {
  }
}

function* deleteAccount() {
  // TODO
}

function* watchAccount() {
  yield all([
    takeLatest(types.ACCOUNT_ASYNC.REQUEST, fetchUser),
    takeLatest(types.ACCOUNT_ASYNC.DELETE, deleteAccount),
    takeLatest(types.ACCOUNT_ASYNC.UPDATE, updateAccount)
  ])
}

export default [watchAccount]
