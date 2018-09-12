import {
  FETCHED_COURSE_NAME,
  REQUESTED_COURSE_NAME_SUCCEEDED,
  REQUESTED_COURSE_NAME_FAIL,
  CHANGE_COURSE_PG,
  CHANGE_COURSE_PG_FAIL,
  CHANGE_COURSE_PG_SUCCESS,
  COURSE_LANGUAGE,
  LOAD_CURRENT_TEACHING_COURSE,

  // COURSE CRUD
  CREATE_COURSE_REQUEST,
  CREATE_COURSE_SUCCESS,
  CREATE_COURSE_FAIL,
  FETCH_COURSE,
  FETCH_COURSE_FAIL,
  FETCH_COURSE_SUCCESS,
  RESET_COURSE_CREATE_FORM,
  DELETE_COURSE_FAIL,
  DELETE_COURSE_SUCCESS,

  // LEVEL CRUD
  ADD_LEVEL,
  ADD_CUID_TO_LEVELS,
  DELETE_LEVEL_FAIL,
  DELETE_LEVEL_SUCCESS,

  // WORD CRUD
  ADD_WORD,
  ADD_CUID_TO_WORDS,
  DELETE_WORD_FAIL,
  DELETE_WORD_SUCCESS
} from './types.js'

const addWord = () => {
  // TODO: pending
}

const changeCoursePg = coursePg => {
  return {
    type: 'CHANGE_COURSE_PG',
    coursePg
  }
}

const changeCoursePgFail = error => {
  return {
    type: 'CHANGE_COURSE_PG_FAIL',
    error
  }
}

const changeCoursePgSuccess = coursePg => {
  return {
    type: 'CHANGE_COURSE_PG_SUCCESS',
    coursePg
  }
}

// COURSE CREATE
// This action was moved to api/course/actions/courseActions.js

// COURSE READ
const fetchCourse = course => {
  return {type: 'FETCH_COURSE', course}
}

const fetchCourseSuccess = data => {
  return {type: 'FETCH_COURSE_SUCCESS', course: data}
}

const fetchCourseFail = error => {
  return {type: 'FETCH_COURSE_FAIL', error}
}

// COURSE DELETE
const deleteCourse = course => {
  return {type: 'DELETE_COURSE', course}
}

const deleteCourseSuccess = data => {
  return {type: 'DELETE_COURSE_SUCCESS', data: data.data}
}

const deleteCourseFail = error => {
  return {type: 'DELETE_COURSE_FAIL', error}
}

// LEVEL CREATE
const addCuidToLevels = cuid => {
  return {type: 'ADD_CUID_TO_LEVELS', cuid}
}

const addLevel = level => {
  return {type: 'ADD_LEVEL', level}
}

// LEVEL DELETE
const deleteLevel = (course, levelId) => {
  return {type: 'DELETE_LEVEL', course, levelId}
}

const deleteLevelSuccess = data => {
  return {type: 'DELETE_LEVEL_SUCCESS', data: data.data}
}

const deleteLevelFail = error => {
  return {type: 'DELETE_LEVEL_FAIL', error}
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

const loadCurrentTeachingCourse = course => {
  return {type: 'LOAD_CURRENT_TEACHING_COURSE', course}
}

export {
  addWord,
  addCuidToLevels,
  addLevel,
  changeCoursePg,
  changeCoursePgFail,
  changeCoursePgSuccess,
  deleteCourse,
  deleteCourseFail,
  deleteCourseSuccess,
  deleteLevel,
  deleteLevelFail,
  deleteLevelSuccess,
  fetchCourse,
  fetchCourseSuccess,
  fetchCourseFail,
  chooseCourseLanguage,
  fetchCourseName,
  requestCourseNameError,
  requestCourseNameSuccess,
  loadCurrentTeachingCourse
}
