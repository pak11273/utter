import {push} from 'react-router-redux'
import {all, call, put, take, takeLatest} from 'redux-saga/effects'
import axios from 'axios'

// actions
import * as types from '../types'

import {fetchData} from '../../../utils/apiMgr'

export function* courses(state) {
  try {
    const limit = state.query.limit
    console.log('limit: ', limit)
    const url = 'api/courses'
    const method = 'get'
    const data = null
    const cb = null
    const params = {limit}

    /**
     * @param {string} url ex.'/teaching-course/:courseCreatorId/:courseId/:courseName'
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

function* watchCourses() {
  yield all([takeLatest(types.COURSES_ASYNC.REQUEST, courses)])
}

export default [watchCourses]
