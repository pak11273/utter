import {push} from 'react-router-redux'
import {all, call, put, select, take, takeLatest} from 'redux-saga/effects'
import axios from 'axios'
import {fetchData} from '../../utils/apiMgr'
import {ADD_FLASH_MESSAGE} from '../../app/types.js'

// types
import * as types from './types'
import {MODAL_RESET} from '../../containers/Modals/types.js'

// actions

export function* updateTeachingLevel(state) {
  const {id, level, name, type} = state
  state = {
    id,
    type,
    name,
    level
  }

  const getCourseDetails = state => state.entitiesReducer.Course

  // Grab course details for backend auth
  var courseDetails = yield select(getCourseDetails)
  courseDetails =
    courseDetails.itemsById[Object.keys(courseDetails.itemsById)[0]]
  const {courseAuthor, courseId, courseName} = courseDetails
  const getAuthId = state => state.entitiesReducer.User.items[0]
  const authId = yield select(getAuthId)
  /**
   * @param {string} url ex.'/api/courses/:authId/:courseAuthor/:courseId/:courseName'
   */
  const url = `/api/courses/${authId}/${courseAuthor}/${courseId}/${courseName}`
  const htmlReadyUrl = encodeURI(url)
  try {
    const url = htmlReadyUrl
    const method = 'put'
    const data = state
    const cb = null
    const params = null

    const res = yield call(fetchData, {url, method, data, params, cb})

    if (res.status >= 200 && res.status < 300) {
      yield put({
        type: types.LEVEL_ASYNC.SUCCESS,
        payload: res.data
      })

      yield put({
        type: ADD_FLASH_MESSAGE,
        message: {
          type: 'success',
          text: 'Your course was updated successfully.'
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
        type: types.LEVEL_ASYNC.ERROR,
        payload: error.message || 'Something went wrong.'
      })
    } else {
      console.log('error: ', error.response.statusText)
      const err = error.response.statusText
      yield put({
        type: types.LEVEL_ASYNC.ERROR,
        payload: err
      })
    }
  } finally {
  }
}

function* watchLevel() {
  yield all([takeLatest(types.LEVEL_ASYNC.UPDATE, updateTeachingLevel)])
}

export default [watchLevel]
