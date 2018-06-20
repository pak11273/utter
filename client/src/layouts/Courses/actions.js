import {
  FETCHED_COURSE_NAME,
  GET_TEACHING_LIST,
  GET_TEACHING_LIST_FAIL,
  GET_TEACHING_LIST_SUCCESS,
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
  READ_COURSE,
  READ_COURSE_FAIL,
  READ_COURSE_SUCCESS,
  RESET_COURSE_CREATE_FORM,
  UPDATE_COURSE,
  UPDATE_COURSE_SUCCESS,
  UPDATE_COURSE_FAIL,
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
const createCourse = course => {
  return {type: 'CREATE_COURSE', course}
}

const createCourseSuccess = data => {
  return {type: 'CREATE_COURSE_SUCCESS', data: data.msg}
}

const createCourseFail = error => {
  return {type: 'CREATE_COURSE_FAIL', error}
}

// COURSE READ
const readCourse = course => {
  return {type: 'READ_COURSE', course}
}

const readCourseSuccess = data => {
  return {type: 'READ_COURSE_SUCCESS', course: data}
}

const readCourseFail = error => {
  return {type: 'READ_COURSE_FAIL', error}
}

// COURSE UPDATE
const updateCourse = course => {
  return {type: 'UPDATE_COURSE', course}
}

const updateCourseSuccess = data => {
  return {type: 'UPDATE_COURSE_SUCCESS', data: data.data}
}

const updateCourseFail = error => {
  return {type: 'UPDATE_COURSE_FAIL', error}
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

const getTeachingList = course => {
  return {type: 'GET_TEACHING_LIST', course}
}

const getTeachingListFail = error => {
  return {type: 'GET_TEACHING_LIST_FAIL', error}
}

const getTeachingListSuccess = data => {
  console.log('data:', data.data)
  return {type: 'GET_TEACHING_LIST_SUCCESS', data: data.data}
}

const requestCourseNameSuccess = data => {
  return {type: 'REQUESTED_COURSE_NAME_SUCCEEDED', data: data.msg}
}

const requestCourseNameError = error => {
  return {type: 'REQUESTED_COURSE_NAME_FAIL', error}
}

const resetCourseCreateForm = () => {
  return {type: 'RESET_COURSE_CREATE_FORM'}
}

const loadCurrentTeachingCourse = course => {
  return {type: 'LOAD_CURRENT_TEACHING_COURSE', course}
}

export {
  addCuidToLevels,
  addLevel,
  changeCoursePg,
  changeCoursePgFail,
  changeCoursePgSuccess,
  createCourse,
  createCourseSuccess,
  createCourseFail,
  deleteCourse,
  deleteCourseFail,
  deleteCourseSuccess,
  deleteLevel,
  deleteLevelFail,
  deleteLevelSuccess,
  getTeachingList,
  getTeachingListFail,
  getTeachingListSuccess,
  readCourse,
  readCourseSuccess,
  readCourseFail,
  updateCourse,
  updateCourseSuccess,
  updateCourseFail,
  chooseCourseLanguage,
  fetchCourseName,
  requestCourseNameError,
  requestCourseNameSuccess,
  resetCourseCreateForm,
  loadCurrentTeachingCourse
}
