import {takeEvery} from 'redux-saga'
import {call, put, select, takeLatest} from 'redux-saga/effects'
import axios from 'axios'
import {
  createCourseSuccess,
  createCourseFail,
  requestCourse,
  requestCourseName,
  requestCourseNameSuccess,
  requestCourseNameError
} from './actions.js'

// CREATE
function* watchCreateCourse() {
  yield takeLatest('CREATE_COURSE_REQUEST', createCourse)
}

function* createCourse(action) {
  try {
    const data = yield call(() => {
      return axios({
        method: 'post',
        url: '/api/courses',
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
    yield put(createCourseSuccess(data.data))
  } catch (error) {
    yield put(createCourseFail(error))
  }
}

// READ
// UPDATE
// DELETE

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

export default [watchCreateCourse, watchFetchCourseName]
