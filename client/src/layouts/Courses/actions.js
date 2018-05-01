import {
  ADD_LEVEL,
  ADD_CUID_TO_LEVELS,
  FETCHED_COURSE_NAME,
  FETCH_TEACHING_LIST,
  FETCH_TEACHING_LIST_FAIL,
  FETCH_TEACHING_LIST_SUCCESS,
  REQUESTED_COURSE_NAME_SUCCEEDED,
  REQUESTED_COURSE_NAME_FAIL,
  CHANGE_COURSE_PG,
  CHANGE_COURSE_PG_FAIL,
  CHANGE_COURSE_PG_SUCCESS,
  COURSE_LANGUAGE,
  LOAD_CURRENT_TEACHING_COURSE,
  // CRUD
  CREATE_COURSE_REQUEST,
  CREATE_COURSE_SUCCESS,
  CREATE_COURSE_FAIL,
  READ_COURSE,
  READ_COURSE_FAIL,
  READ_COURSE_SUCCESS,
  RESET_COURSE_CREATE_FORM,
  UPDATE_COURSE,
  UPDATE_COURSE_SUCCESS,
  UPDATE_COURSE_FAIL
} from './types.js'

const addCuidToLevels = cuid => {
  return {type: 'ADD_CUID_TO_LEVELS', cuid}
}

const addLevel = level => {
  return {type: 'ADD_LEVEL', level}
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

// CREATE
const createCourse = course => {
  return {type: 'CREATE_COURSE', course}
}

const createCourseSuccess = data => {
  return {type: 'CREATE_COURSE_SUCCESS', data: data.msg}
}

const createCourseFail = error => {
  return {type: 'CREATE_COURSE_FAIL', error}
}

// READ
const readCourse = course => {
  return {type: 'READ_COURSE', course}
}

const readCourseSuccess = data => {
  return {type: 'READ_COURSE_SUCCESS', course: data}
}

const readCourseFail = error => {
  return {type: 'READ_COURSE_FAIL', error}
}

// UPDATE
const updateCourse = course => {
  return {type: 'UPDATE_COURSE', course}
}

const updateCourseSuccess = data => {
  return {type: 'UPDATE_COURSE_SUCCESS', data: data.data}
}

const updateCourseFail = error => {
  return {type: 'UPDATE_COURSE_FAIL', error}
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

const fetchTeachingList = course => {
  return {type: 'FETCH_TEACHING_LIST', course}
}

const fetchTeachingListFail = error => {
  return {type: 'FETCH_TEACHING_LIST_FAIL', error}
}

const fetchTeachingListSuccess = data => {
  return {type: 'FETCH_TEACHING_LIST_SUCCESS', data: data.data}
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
  fetchTeachingList,
  fetchTeachingListFail,
  fetchTeachingListSuccess,
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
