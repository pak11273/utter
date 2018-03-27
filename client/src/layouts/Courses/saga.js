import {takeEvery} from 'redux-saga/effects'
import {call, put, select, takeLatest} from 'redux-saga/effects'
import axios from 'axios'
import {
  updateCourseFail,
  updateCourseSuccess,
  createCourseFail,
  createCourseSuccess,
  readCourseFail,
  readCourseSuccess,
  requestCourse,
  requestCourseName,
  requestCourseNameSuccess,
  requestCourseNameError
} from './actions.js'

// CREATE
function* watchCreateCourse() {
  yield takeLatest('CREATE_COURSE', createCourse)
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
    yield put(createCourseSuccess(data))
  } catch (error) {
    yield put(createCourseFail(error))
  }
}

// READ
function* watchReadCourse() {
  yield takeLatest('READ_COURSE', readCourse)
}

function* readCourse(action) {
  const courseId = action.course.currentTeachingCourse.courseId
  const courseCreatorId = action.course.currentTeachingCourse.courseCreatorId
  const courseName = action.course.currentTeachingCourse.courseName
  const getAuthId = state => state.authReducer.user._id
  const authId = yield select(getAuthId)
  const url = `/api/courses/${courseId}/${courseName}`
  const htmlReadyUrl = encodeURI(url)
  try {
    if (courseCreatorId !== authId) {
      throw new Error("creator Id's don't match")
    } else {
      const data = yield call(() => {
        return axios({
          method: 'get',
          url: htmlReadyUrl,
          data: {
            course: action.course
          }
        })
          .then(res => {
            return res
          })
          .catch(err => {
            throw err
          })
      })
      yield put(readCourseSuccess(data.data))
    }
  } catch (error) {
    yield put(readCourseFail(error))
  }
}

// UPDATE
function* watchUpdateCourse() {
  yield takeLatest('UPDATE_COURSE', updateCourse)
}

function* updateCourse(action) {
  const courseId = action.course.courseId
  const courseCreatorId = action.course.courseCreatorId
  const courseName = action.course.courseName
  const getAuthId = state => state.authReducer.user._id
  const authId = yield select(getAuthId)
  const url = `/api/courses/${courseId}/${courseName}`
  const htmlReadyUrl = encodeURI(url)
  try {
    if (courseCreatorId !== authId) {
      throw new Error('You are not the creator of this course.')
    } else {
      const data = yield call(() => {
        return axios({
          method: 'put',
          url: htmlReadyUrl,
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
      yield put(updateCourseSuccess(data))
    }
  } catch (error) {
    console.log(error)
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

export default [
  watchCreateCourse,
  watchFetchCourseName,
  watchReadCourse,
  watchUpdateCourse
]
