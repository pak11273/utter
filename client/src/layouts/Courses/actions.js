import {
  CREATE_COURSE_REQUEST,
  CREATE_COURSE_SUCCESS,
  CREATE_COURSE_FAIL,
  REQUESTED_COURSE_NAME_SUCCEEDED,
  REQUESTED_COURSE_NAME_FAIL,
  COURSE_LANGUAGE
} from './types.js'

// CREATE
const createCourseRequest = course => {
  return {type: 'CREATE_COURSE_REQUEST', course}
}

const createCourseSuccess = data => {
  return {type: 'CREATE_COURSE_SUCCESS', data: data.msg}
}

const createCourseFail = error => {
  return {type: 'CREATE_COURSE_FAIL', error}
}

const chooseCourseLanguage = courseLanguage => {
  return {
    type: COURSE_LANGUAGE,
    payload: new Promise((resolve, reject) => {
      resolve(courseLanguage)
    })
  }
}

const fetchCourseName = course => {
  return {type: 'FETCHED_COURSE_NAME', course}
}

const requestCourseNameSuccess = data => {
  return {type: 'REQUESTED_COURSE_NAME_SUCCEEDED', data: data.msg}
}

const requestCourseNameError = error => {
  return {type: 'REQUESTED_COURSE_NAME_FAIL', error}
}

export {
  createCourseRequest,
  createCourseSuccess,
  createCourseFail,
  chooseCourseLanguage,
  fetchCourseName,
  requestCourseNameError,
  requestCourseNameSuccess
}
