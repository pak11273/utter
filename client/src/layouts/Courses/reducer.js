import {
  CREATE_COURSE_REQUEST,
  CREATE_COURSE_SUCCESS,
  CREATE_COURSE_FAIL,
  COURSE_NAME_ASYNC_SUCCESS,
  REQUESTED_COURSE_NAME,
  REQUESTED_COURSE_NAME_FAILED,
  REQUESTED_COURSE_NAME_SUCCEEDED,
  COURSE_LANGUAGE_FULFILLED
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
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_COURSE_REQUEST':
      return {
        ...state,
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
        courseNameMsg: action.data,
        loading: false,
        error: false
      }
    case 'REQUESTED_COURSE_NAME_FAIL':
      return {
        loading: false,
        error: true,
        errorMsg: action.error
      }
    case COURSE_LANGUAGE_FULFILLED:
      return {
        ...state,
        courseLanguage: action.payload
      }
    default:
      return state
  }
}
