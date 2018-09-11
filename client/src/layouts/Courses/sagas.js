import {takeEvery} from 'redux-saga/effects'
import {call, put, select, take, takeLatest} from 'redux-saga/effects'
import axios from 'axios'
import {
  changeCoursePgFail,
  changeCoursePgSuccess,
  deleteCourseFail,
  deleteCourseSuccess,
  deleteLevelFail,
  deleteLevelSuccess,
  fetchCourseFail,
  fetchCourseSuccess,
  requestCourse,
  requestCourseName,
  requestCourseNameSuccess,
  requestCourseNameError,
  updateCourseFail,
  updateCourseSuccess
} from './actions.js'

function* changeCoursePg(action) {
  const getAuthId = state => state.userReducer.user._id
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
      yield put({type: 'GET_TEACHING_LIST'})
    }
  } catch (error) {
    yield put(changeCoursePgFail(error))
  }
}

// READ
// moved to api/course sagas
// function* watchFetchCourse() {
//   yield takeLatest('FETCH_COURSE', fetchCourse)
// }

// function* fetchCourse(action) {
//   const courseId = action.course.courseId
//   const courseName = action.course.courseName
//   const getAuthId = state => state.userReducer.user._id
//   const authId = yield select(getAuthId)
//   const url = `/api/courses/my-courses/${authId}/${courseId}/${courseName}`
//   const htmlReadyUrl = encodeURI(url)
//   try {
//     if (!authId) {
//       throw new Error('No author with this id')
//     } else {
//       const data = yield call(() => {
//         return axios({
//           method: 'get',
//           url: htmlReadyUrl,
//           data: {
//             course: action.course
//           }
//         })
//           .then(res => {
//             return res
//           })
//           .catch(err => {
//             throw err
//           })
//       })
//       yield put(fetchCourseSuccess(data.data))
//     }
//   } catch (error) {
//     yield put(fetchCourseFail(error))
//   }
// }

// UPDATE
function* watchUpdateCourse() {
  yield takeLatest('UPDATE_COURSE', updateCourse)
}

function* updateCourse(action) {
  const courseId = action.course.courseId
  const courseName = action.course.courseName
  const getAuthId = state => state.userReducer.user._id
  const authId = yield select(getAuthId)
  const url = `/api/courses/my-courses/${authId}/${courseId}/${courseName}`
  const htmlReadyUrl = encodeURI(url)
  try {
    if (!authId) {
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
function* watchDeleteCourse() {
  yield takeLatest('DELETE_COURSE', deleteCourse)
}

function* deleteCourse(action) {
  // TODO: delete course
  const courseId = action.course.courseId
  const courseName = action.course.courseName
  const getAuthId = state => state.userReducer.user._id
  const authId = yield select(getAuthId)
  const url = `/api/courses/my-courses/${authId}/${courseId}/${courseName}`
  const htmlReadyUrl = encodeURI(url)
  try {
    if (!authId) {
      throw new Error('You are not the creator of this course.')
    } else {
      const data = call(() => {
        return axios({
          method: 'delete',
          url: htmlReadyUrl
        })
          .then(res => {
            return res
          })
          .catch(err => {
            throw err.response.data.error
          })
      })
      yield put(deleteCourseSuccess(data))
    }
  } catch (error) {
    yield put(deleteCourseFail(error))
  }
}

// CREATE LEVEL

// DELETE LEVEL
function* watchDeleteLevel() {
  yield takeLatest('DELETE_LEVEL', deleteLevel)
}

function* deleteLevel(action) {
  const levelId = action.levelId
  const courseId = action.course.courseId
  const courseName = action.course.courseName
  const getAuthId = state => state.userReducer.user._id
  const authId = yield select(getAuthId)
  const url = `/api/courses/my-courses/${authId}/${courseId}/${courseName}/${levelId}`
  const htmlReadyUrl = encodeURI(url)
  const course = action.course
  try {
    if (!authId) {
      throw new Error('You are not the creator of this course.')
    } else {
      const data = yield call(() => {
        return axios({
          method: 'delete',
          url: htmlReadyUrl
        })
          .then(res => {
            return res
          })
          .catch(err => {
            throw err.response.data.error
          })
      })
      yield put(deleteLevelSuccess(data))
      yield put({type: 'FETCH_COURSE', course: course})
    }
  } catch (err) {
    yield put(deleteLevelFail(err))
  }
}

// Sagas
function* watchGetCourseName() {
  yield takeEvery('GETED_COURSE_NAME', getCourseNameAsync)
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

function* getCourseNameAsync(action) {
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
  // watchFetchCourse,
  watchDeleteCourse,
  watchDeleteLevel,
  watchGetCourseName,
  watchUpdateCourse
]
