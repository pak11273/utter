import {
  ADD_LEVEL,
  CREATE_COURSE_REQUEST,
  CREATE_COURSE_SUCCESS,
  CREATE_COURSE_FAIL,
  COURSE_NAME_ASYNC_SUCCESS,
  REQUESTED_COURSE_NAME,
  REQUESTED_COURSE_NAME_FAILED,
  REQUESTED_COURSE_NAME_SUCCEEDED,
  COURSE_LANGUAGE_FULFILLED,
  SAVE_FORM_TO_REDUX
} from './types'

// Reducer
const initialState = {
  url: '',
  courseNameMsg: '',
  loading: false,
  error: false,
  errorMsg: '',
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
  currentLearningCourse: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
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
          levels: [
            ...state.currentTeachingCourse.levels,
            {
              level: action.level,
              title: 'Change this title'
            }
          ]
        }
      }
    case 'CREATE_COURSE_REQUEST':
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
    case 'REQUESTED_COURSE_NAME_SUCCEEDED':
      return {
        ...state,
        courseNameMsg: action.data,
        loading: false,
        error: false
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
    case 'SAVE_FORM_TO_REDUX':
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
