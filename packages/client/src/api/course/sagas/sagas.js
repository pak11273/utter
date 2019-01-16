import {push} from "react-router-redux"
import {all, call, put, select, takeLatest} from "redux-saga/effects"
import {fetchData} from "../../../utils/apiMgr"
import {ADD_FLASH_MESSAGE} from "../../../app/types.js"

// types
import * as types from "../types"
import {MODAL_RESET} from "../../../containers/modals/types.js"

// actions
// import {resetModal} from '../../../containers/modals/actions.js'

function* deleteTeachingCourse(state) {
  const {courseAuthor, courseId, courseName} = state
  const getAuthId = state => state.apiReducer.User.items[0]
  const authId = yield select(getAuthId)
  const url = `/api/courses/${authId}/${courseAuthor}/${courseId}/${courseName}`
  const htmlReadyUrl = encodeURI(url)
  try {
    const url = htmlReadyUrl
    const method = "delete"
    const data = {}
    const cb = null
    const params = null

    const res = yield call(fetchData, {url, method, data, params, cb})

    if (res.status >= 200 && res.status < 300) {
      yield put({
        type: types.COURSE_ASYNC.SUCCESS,
        payload: res.data
      })

      // TODO reset modalReducer
      yield put({
        type: MODAL_RESET
      })

      yield put(push(`/courses/created`))
    } else {
      throw res
    }
  } catch (error) {
    if (!error.response) {
      yield put({
        type: types.COURSE_ASYNC.ERROR,
        payload: error.message || "Something went wrong."
      })
    } else {
      console.log("error: ", error.response.statusText)
      const err = error.response.statusText
      yield put({
        type: types.COURSE_ASYNC.ERROR,
        payload: err
      })
    }
  } finally {
    // no op
  }
}

export function* fetchTeachingCourse(state) {
  const {courseAuthorId, courseId, courseName} = state
  const getAuthId = state => state.apiReducer.User.items[0]
  const authId = yield select(getAuthId)
  const url = `/api/courses/${authId}/${courseAuthorId}/${courseId}/${courseName}`
  const htmlReadyUrl = encodeURI(url)

  try {
    const url = htmlReadyUrl
    const method = "get"
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
        payload: error.message || "Something went wrong."
      })
    } else {
      console.log("error: ", error.response.statusText)
      const err = error.response.statusText
      yield put({
        type: types.COURSE_ASYNC.ERROR,
        payload: err
      })
    }
  } finally {
    // no op
  }
}

export function* updateTeachingCourse(state) {
  const {courseAuthor, courseId, courseName} = state
  const getAuthId = state => state.apiReducer.User.items[0]
  const authId = yield select(getAuthId)
  /**
   * @param {string} url ex.'/api/courses/:authId/:courseAuthor/:courseId/:courseName'
   */
  const url = `/api/courses/${authId}/${courseAuthor}/${courseId}/${courseName}`
  const htmlReadyUrl = encodeURI(url)
  try {
    const url = htmlReadyUrl
    const method = "put"
    const data = state
    const cb = null
    const params = null

    const res = yield call(fetchData, {url, method, data, params, cb})

    if (res.status >= 200 && res.status < 300) {
      yield put({
        type: types.COURSE_ASYNC.SUCCESS,
        payload: res.data
      })

      yield put({
        type: ADD_FLASH_MESSAGE,
        message: {
          type: "success",
          text: "Your course was updated successfully."
        }
      })

      res.data.data.courseAuthorId = res.data.data.courseAuthor
      yield call(fetchTeachingCourse, res.data.data)

      yield put(push(`/course/${courseId}/${courseName}/edit`))
    } else {
      throw res
    }
  } catch (error) {
    if (!error.response) {
      yield put({
        type: types.COURSE_ASYNC.ERROR,
        payload: error.message || "Something went wrong."
      })
    } else {
      console.log("error: ", error.response.statusText)
      const err = error.response.statusText
      yield put({
        type: types.COURSE_ASYNC.ERROR,
        payload: err
      })
    }
  } finally {
    // no op
  }
}

function* watchCourse() {
  yield all([
    takeLatest(types.COURSE_ASYNC.DELETE, deleteTeachingCourse),
    takeLatest(types.COURSE_ASYNC.REQUEST, fetchTeachingCourse),
    takeLatest(types.COURSE_ASYNC.UPDATE, updateTeachingCourse)
  ])
}

export default [watchCourse]
