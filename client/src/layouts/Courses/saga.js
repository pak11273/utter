import {takeEvery} from 'redux-saga'
import {call, put, select, takeLatest} from 'redux-saga/effects'
import axios from 'axios'
import {requestCourseNameSuccess, requestCourseNameError} from './actions.js'

// Sagas
function* watchFetchCourseName() {
  yield takeEvery('FETCHED_COURSE_NAME', fetchCourseNameAsync)
}

function* fetchCourseNameAsync(action) {
  try {
    const data = yield call(() => {
      return axios({
        method: 'post',
        url: '/api/courses/unique',
        data: {
          course: action.course
        }
      })
        .then(res => {
          return res
        })
        .catch(err => {
          throw err.response.data.error
        })
    })
    yield put(requestCourseNameSuccess(data.data))
  } catch (error) {
    yield put(requestCourseNameError(error))
  }
}

export default [watchFetchCourseName]
