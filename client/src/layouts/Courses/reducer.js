import {
  ADD_CUID_TO_LEVELS,
  ADD_LEVEL,
  CHANGE_COURSE_PG_FAIL,
  CHANGE_COURSE_PG_SUCCESS,
  CREATE_COURSE,
  CREATE_COURSE_SUCCESS,
  CREATE_COURSE_FAIL,
  DELETE_LEVEL,
  DELETE_LEVEL_FAIL,
  DELETE_LEVEL_SUCCESS,
  FETCH_TEACHING_LIST,
  FETCH_TEACHING_LIST_FAIL,
  FETCH_TEACHING_LIST_SUCCESS,
  READ_COURSE,
  READ_COURSE_SUCCESS,
  READ_COURSE_FAIL,
  COURSE_NAME_ASYNC_SUCCESS,
  REQUESTED_COURSE_NAME,
  REQUESTED_COURSE_NAME_FAILED,
  REQUESTED_COURSE_NAME_SUCCEEDED,
  UPDATE_COURSE,
  UPDATE_COURSE_SUCCESS,
  UPDATE_COURSE_FAIL,
  COURSE_LANGUAGE_FULFILLED,
  RESET_COURSE_CREATE_FORM,
  LOAD_CURRENT_TEACHING_COURSE
} from './types'

// Reducer
const initialState = {
  url: '',
  courseNameMsg: '',
  loading: false,
  error: false,
  errorMsg: '',
  coursePg: 1,
  create: {
    pending: false,
    course: null,
    error: null
  },
  currentTeachingCourse: {
    levels: [
      {
        level: 1,
        title: 'Change this title'
      }
    ]
  },
  teachingCourseList: {
    result: {
      docs: []
    }
  },
  currentLearningCourse: {}
}

import cuid from 'cuid'

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CUID_TO_LEVELS':
      return {
        ...state,
        ...state.currentTeachingCourse,
        currentTeachingCourse: {
          levels: [
            ...state.currentTeachingCourse.levels,
            {
              cuid: action.cuid
            }
          ]
        }
      }
    case 'ADD_LEVEL':
      return {
        ...state,
        create: {
          ...state.create,
          pending: true,
          course: null,
          error: null
        },
        currentTeachingCourse: {
          ...state.currentTeachingCourse,
          levels: [
            ...state.currentTeachingCourse.levels,
            {
              level: action.level,
              title: 'Change this title',
              cuid: cuid()
            }
          ]
        }
      }
    case 'CHANGE_COURSE_PG_FAIL':
      return {
        ...state,
        errorMsg: action.error.message
      }
    case 'CHANGE_COURSE_PG_SUCCESS':
      return {
        ...state,
        coursePg: action.coursePg
      }
    case 'CREATE_COURSE':
      return {
        ...state,
        currentTeachingCourse: {...state.currentTeachingCourse},
        create: {
          ...state.create,
          pending: true,
          course: null,
          error: null
        }
      }
    case 'CREATE_COURSE_SUCCESS':
      return {
        ...state,
        ...state.currentTeachingCourse,
        create: {
          ...state.create,
          pending: false,
          course: action.course,
          error: null
        }
      }
    case 'CREATE_COURSE_FAIL':
      return {
        ...state,
        create: {
          ...state.create,
          pending: false,
          course: null,
          error: action.error
        }
      }

    case 'DELETE_LEVEL_FAIL':
      return {
        ...state,
        error: true,
        errorMsg: action.error.message
      }
    case 'FETCH_TEACHING_LIST_FAIL':
      return {
        ...state,
        error: true,
        errorMsg: action.error.message
      }
    case 'FETCH_TEACHING_LIST_SUCCESS':
      return {
        ...state,
        ...state.teachingCourseList,
        teachingCourseList: action.data
      }
    case 'READ_COURSE_SUCCESS':
      return {
        ...state,
        currentTeachingCourse: {
          ...action.course
        }
      }
    case 'READ_COURSE_FAIL':
      return {
        ...state,
        create: {
          ...state.create,
          pending: false,
          course: null,
          error: action.error
        }
      }
    case 'UPDATE_COURSE':
      return {
        ...state,
        currentTeachingCourse: {
          ...state.currentTeachingCourse
        }
      }
    case 'UPDATE_COURSE_SUCCESS':
      return {
        ...state,
        currentTeachingCourse: {
          ...state.currentTeachingCourse,
          course: action.course
        }
      }
    case 'UPDATE_COURSE_FAIL':
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.error.message
      }
    case 'REQUESTED_COURSE_NAME_SUCCEEDED':
      return {
        ...state,
        courseNameMsg: action.data,
        loading: false,
        error: false,
        errorMsg: action.error
      }
    case 'REQUESTED_COURSE_NAME_FAIL':
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.error
      }
    case COURSE_LANGUAGE_FULFILLED:
      return {
        ...state,
        courseLanguage: action.payload
      }
    case 'RESET_COURSE_CREATE_FORM':
      return {
        ...state,
        courseNameMsg: '',
        loading: false,
        error: false,
        errorMsg: action.error
      }
    case 'LOAD_CURRENT_TEACHING_COURSE':
      return {
        ...state,
        currentTeachingCourse: {
          ...state.currentTeachingCourse,
          ...action.course
        }
      }
    default:
      return state
  }
}
