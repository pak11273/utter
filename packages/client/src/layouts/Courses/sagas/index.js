import {push} from "react-router-redux"
import {all, call, put, select, takeLatest} from "redux-saga/effects"
import {fetchData} from "../../../utils/apiMgr"
import {ADD_FLASH_MESSAGE} from "../../../app/types.js"

// types
import * as types from "../types"
import {MODAL_RESET} from "../../../containers/Modals/types.js"

// actions
// import {resetModal} from '../../../containers/Modals/actions.js'

function* fetchLevels(action) {
  yield console.log("action: ", action)
}

function* createCourseThumbnail(action) {
  console.log("action: ", action)
  /* /1* handleImageUpload(files) { *1/ */
  /*   // remove previous files from cdn */
  /*   if (!isEmpty(this.state.uploadedFile)) { */
  /*     console.log("file: ", this.state.uploadedFile) */
  /*     this.handleImageDelete(this.state) */
  /*   } */
  /*   // Push all the axios request promise into a single array */
  /*   const uploaders = files.map(file => { */
  /*     // Initial FormData */
  /*     const formData = new FormData() */
  /*     formData.append("file", file) */
  /*     formData.append("tags", `course-name`) */
  /*     formData.append("upload_preset", "z28ks5gg") // Replace the preset name with your own */
  /*     formData.append("folder", "course-thumbnails") // Folder to place image in */
  /*     formData.append("api_key", "225688292439754") // Replace API key with your own Cloudinary key */
  /*     formData.append("timestamp", Date.now() / 1000 || 0) */
  /*     // set loading and disable submit */
  /*     const newState = update(this.state, { */
  /*       loading: {$set: true}, */
  /*       disable: {$set: true} */
  /*     }) */
  /*     this.setState(newState) */
  /*     // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own) */
  /*     return axios({ */
  /*       method: "POST", */
  /*       url: "https://api.cloudinary.com/v1_1/dgvw5b6pf/image/upload/", */
  /*       data: formData */
  /*     }) */
  /*       .then(res => { */
  /*         const {data} = res */
  /*         const newState = update(this.state, { */
  /*           public_id: {$set: data.public_id}, */
  /*           secure_url: {$set: data.secure_url}, */
  /*           signature: {$set: data.signature}, */
  /*           url: {$set: data.url} */
  /*         }) */
  /*         this.setState(newState) */
  /*         this.props.setFieldValue("courseImage", data.secure_url) */
  /*         return data */
  /*       }) */
  /*       .catch(err => { */
  /*         console.log("upload error: ", err) */
  /*       }) */
  /* }) */
  yield put(push(`/courses/created`))
}

function* deleteTeachingCourse(state) {
  const {courseAuthor, courseId, courseName} = state
  const getAuthId = state => state.entitiesReducer.User.items[0]
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
  const getAuthId = state => state.entitiesReducer.User.items[0]
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
  const getAuthId = state => state.entitiesReducer.User.items[0]
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
    takeLatest(types.COURSE_ASYNC.CREATE, createCourseThumbnail),
    takeLatest(types.LEVELS_ASYNC.FETCH, fetchLevels),
    takeLatest(types.COURSE_ASYNC.DELETE, deleteTeachingCourse),
    takeLatest(types.COURSE_ASYNC.REQUEST, fetchTeachingCourse),
    takeLatest(types.COURSE_ASYNC.UPDATE, updateTeachingCourse)
  ])
}

export default [watchCourse]
