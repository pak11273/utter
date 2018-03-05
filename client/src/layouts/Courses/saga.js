import {takeEvery} from 'redux-saga'
import {call, put, select, takeLatest} from 'redux-saga/effects'
import axios from 'axios'
import {
  updateCourseFail,
  updateCourseSuccess,
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
function* watchUpdateCourse() {
  yield takeLatest('UPDATE_COURSE', updateCourse)
}

function* updateCourse(action) {
  try {
    const data = yield call(() => {
      return axios({
        method: 'put',
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
    yield put(updateCourseSuccess(data.data))
  } catch (error) {
    yield put(updateCourseFail(error))
  }
}

// DELETE

// Sagas
function* watchFetchCourseName() {
  yield takeEvery('FETCHED_COURSE_NAME', fetchCourseNameAsync)
}

function* watchSetCourse() {
  yield takeEvery('SET_COURSE', setCourseAsync)
}

function* setCourseAsync(action) {
  try {
    const data = yield call(() => {
      return 'pending'
    })
    yield put(setCourseSuccess())
  } catch (error) {
    yield put(setCourseError(error))
  }
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

export default [watchCreateCourse, watchFetchCourseName, watchUpdateCourse]
