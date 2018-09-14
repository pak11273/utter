import {push} from 'react-router-redux'
import {all, call, put, select, take, takeLatest} from 'redux-saga/effects'
import axios from 'axios'
import {fetchData} from '../../../utils/apiMgr'

// types
import * as types from '../types'

// CREATE
function* createTeachingCourse(course) {
  try {
    const data = yield call(() => {
      return axios({
        method: 'post',
        url: '/api/courses',
        data: {
          course
        }
      })
        .then(res => {
          return res
        })
        .catch(err => {
          throw err.response.data.error
        })
    })

    yield put({
      type: types.COURSE_ASYNC.SUCCESS,
      payload: data
    })

    data.data.courseAuthorId = data.data.courseAuthor
    yield call(fetchTeachingCourse, data.data)
  } catch (error) {
    yield put({
      type: types.COURSE_ASYNC.ERROR,
      payload: error
    })
  }
}

export function* fetchTeachingCourse(state) {
  const {courseAuthorId, courseId, courseName} = state
  const getAuthId = state => state.entitiesReducer.User.items[0]
  const authId = yield select(getAuthId)
  const url = `/api/courses/${authId}/${courseAuthorId}/${courseId}/${courseName}`
  const htmlReadyUrl = encodeURI(url)
  try {
    const url = htmlReadyUrl
    const method = 'get'
    const data = {}
    const cb = null
    const params = null

    /**
     * @param {string} url ex.'/api/courses/:authId/:courseAuthorId/:courseId/:courseName'
     */
    const res = yield call(fetchData, {url, method, data, params, cb})

    if (res.status >= 200 && res.status < 300) {
      yield put({
        type: types.COURSE_ASYNC.SUCCESS,
        payload: res.data
      })

      yield put(push(`/course/${courseId}/${courseName}/edit`))
    } else {
      throw res
    }
  } catch (error) {
    if (!error.response) {
      yield put({
        type: types.COURSE_ASYNC.ERROR,
        payload: error.message || 'Something went wrong.'
      })
    } else {
      console.log('error: ', error.response.statusText)
      const err = error.response.statusText
      yield put({
        type: types.COURSE_ASYNC.ERROR,
        payload: err
      })
    }
  } finally {
  }
}

export function* updateTeachingCourse(state) {
  const {courseAuthor, courseId, courseName} = state
  const getAuthId = state => state.entitiesReducer.User.items[0]
  const authId = yield select(getAuthId)
  const url = `/api/courses/${authId}/${courseAuthor}/${courseId}/${courseName}`
  const htmlReadyUrl = encodeURI(url)
  try {
    const url = htmlReadyUrl
    const method = 'put'
    const data = state
    const cb = null
    const params = null

    /**
     * @param {string} url ex.'/api/courses/:courseAuthorId/:courseId/:courseName'
     */
    const res = yield call(fetchData, {url, method, data, params, cb})

    if (res.status >= 200 && res.status < 300) {
      yield put({
        type: types.COURSE_ASYNC.SUCCESS,
        payload: res.data
      })

      yield put(push(`/course/${courseId}/${courseName}/edit`))
    } else {
      throw res
    }
  } catch (error) {
    if (!error.response) {
      yield put({
        type: types.COURSE_ASYNC.ERROR,
        payload: error.message || 'Something went wrong.'
      })
    } else {
      console.log('error: ', error.response.statusText)
      const err = error.response.statusText
      yield put({
        type: types.COURSE_ASYNC.ERROR,
        payload: err
      })
    }
  } finally {
  }
}

//TODO delete when done transferring to the above function
function* updateCourse(action) {
  // const courseId = action.course.courseId
  // const courseName = action.course.courseName
  // const getAuthId = state => state.userReducer.user._id
  // const authId = yield select(getAuthId)
  // const url = `/api/courses/my-courses/${authId}/${courseId}/${courseName}`
  // const htmlReadyUrl = encodeURI(url)
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

function* watchCourse() {
  yield all([
    takeLatest(types.COURSE_ASYNC.CREATE, createTeachingCourse),
    takeLatest(types.COURSE_ASYNC.REQUEST, fetchTeachingCourse),
    takeLatest(types.COURSE_ASYNC.UPDATE, updateTeachingCourse)
  ])
}

// function* updateCourse() {
//   yield all([types.COURSE_ASYNC.UPDATE, updateTeachingCourse])
// }

export default [watchCourse]
