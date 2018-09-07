import {push} from 'react-router-redux'
import {all, call, put, take, takeLatest} from 'redux-saga/effects'
import axios from 'axios'

// actions
import * as types from '../types'

import {fetchData} from '../../../utils/apiMgr'

export function* fetchCourses(state) {
  console.log('sagacoruse: ', state)
  try {
    const url = 'api/courses'
    const method = 'get'
    const data = null
    const cb = null
    const params = state

    /**
     * @param {string} url ex.'/teaching-course/:courseAuthorId/:courseId/:courseName'
     */
    const res = yield call(fetchData, {url, method, data, params, cb})

    if (res.status >= 200 && res.status < 300) {
      yield put({
        type: types.COURSES_ASYNC.SUCCESS,
        payload: res.data
      })
    } else {
      throw res
    }
  } catch (error) {
    if (!error.response) {
      yield put({
        type: types.COURSES_ASYNC.ERROR,
        payload: error.message || 'Something went wrong.'
      })
    } else {
      const err = error.response.statusText
      yield put({
        type: types.COURSES_ASYNC.ERROR,
        payload: err
      })
    }
  } finally {
  }
}

function* watchResetCourses() {
  // yield all([takeLatest(types.COURSES_ASYNC.RESET, resetCourses)])
  console.log('hello world')
}

function* watchCourses() {
  yield all([takeLatest(types.COURSES_ASYNC.REQUEST, fetchCourses)])
}

export default [watchCourses]
