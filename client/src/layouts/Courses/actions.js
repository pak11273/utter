import {
  COURSE_LANGUAGE,
  REQUESTED_COURSE_NAME_FAILED,
  REQUESTED_COURSE_NAME_SUCCEEDED,
  REQUESTED_DOG,
  REQUESTED_DOG_FAILED,
  REQUESTED_DOG_SUCCEEDED,
  FETCHED_DOG
} from './types.js'

const requestDog = () => {
  return {type: 'REQUESTED_DOG'}
}

const requestDogSuccess = data => {
  return {type: 'REQUESTED_DOG_SUCCEEDED', url: data.message}
}

const requestDogError = () => {
  return {type: 'REQUESTED_DOG_FAILED'}
}

const fetchDog = () => {
  return {type: 'FETCHED_DOG'}
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
  return {type: 'REQUESTED_COURSE_NAME_FAILED', error}
}

export {
  chooseCourseLanguage,
  fetchDog,
  fetchCourseName,
  requestCourseNameError,
  requestCourseNameSuccess,
  requestDog,
  requestDogError,
  requestDogSuccess
}
