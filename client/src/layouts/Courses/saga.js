import {takeEvery} from 'redux-saga/effects'
import {call, put, select, take, takeLatest} from 'redux-saga/effects'
import axios from 'axios'
import {
  updateCourseFail,
  updateCourseSuccess,
  changeCoursePgFail,
  changeCoursePgSuccess,
  createCourseFail,
  createCourseSuccess,
  fetchTeachingListFail,
  fetchTeachingListSuccess,
  readCourseFail,
  readCourseSuccess,
  requestCourse,
  requestCourseName,
  requestCourseNameSuccess,
  requestCourseNameError
} from './actions.js'

// Fetch teaching list
function* watchFetchTeachingList() {
  yield takeLatest('FETCH_TEACHING_LIST', fetchTeachingList)
}

function* fetchTeachingList(action) {
  const getAuthId = state => state.authReducer.user._id
  const authId = yield select(getAuthId)
  const getCoursePg = state => state.courseReducer.coursePg
  const coursePg = yield select(getCoursePg)
  const url = `/api/courses/my-courses/${authId}/?pg=${coursePg}`
  const htmlReadyUrl = encodeURI(url)
  try {
    if (!authId) {
      throw new Error('No such user exists')
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
            throw err.response.data.error
          })
      })
      if (_.isEmpty(data.data.result.docs)) {
        yield put(changeCoursePgSuccess(1))
      }
      yield put(fetchTeachingListSuccess(data))
    }
  } catch (error) {
    yield put(fetchTeachingListFail(error))
  }
}

// Courses Teaching Pagination
function* watchChangePg() {
  yield takeLatest('CHANGE_COURSE_PG', changeCoursePg)
}

function* changeCoursePg(action) {
  const getAuthId = state => state.authReducer.user._id
  const authId = yield select(getAuthId)
  const coursePg = Number(action.coursePg)
  const url = `/api/courses/my-courses/${authId}/?pg=${coursePg}`
  const htmlReadyUrl = encodeURI(url)
  try {
    if (!authId) {
      throw new Error('No author with this id')
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
      yield put(changeCoursePgSuccess(coursePg))
      yield put({type: 'FETCH_TEACHING_LIST'})
    }
  } catch (error) {
    yield put(changeCoursePgFail(error))
  }
}

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
  const courseName = action.course.currentTeachingCourse.courseName
  const getAuthId = state => state.authReducer.user._id
  const authId = yield select(getAuthId)
  const url = `/api/courses/${courseId}/${courseName}`
  const htmlReadyUrl = encodeURI(url)
  try {
    if (!authId) {
      throw new Error('No author with this id')
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
    console.log('error: ', error)
    yield put(readCourseFail(error))
  }
}

// UPDATE
function* watchUpdateCourse() {
  yield takeLatest('UPDATE_COURSE', updateCourse)
}

function* updateCourse(action) {
  const courseId = action.course.courseId
  const courseName = action.course.courseName
  const getAuthId = state => state.authReducer.user._id
  const authId = yield select(getAuthId)
  const url = `/api/courses/${courseId}/${courseName}`
  const htmlReadyUrl = encodeURI(url)
  try {
    if (authId) {
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
  watchChangePg,
  watchCreateCourse,
  watchFetchCourseName,
  watchFetchTeachingList,
  watchReadCourse,
  watchUpdateCourse
]
