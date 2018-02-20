import {
  COURSE_NAME_ASYNC_SUCCESS,
  FETCHED_DOG,
  REQUESTED_COURSE_NAME,
  REQUESTED_COURSE_NAME_FAILED,
  REQUESTED_COURSE_NAME_SUCCEEDED,
  COURSE_LANGUAGE_FULFILLED,
  REQUESTED_DOG,
  REQUESTED_DOG_FAILED,
  REQUESTED_DOG_SUCCEEDED
} from './types'

// Reducer
const initialState = {
  url: '',
  courseNameMsg: '',
  loading: false,
  error: false,
  errorMsg: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCHED_COURSE_NAME':
      return {
        ...state,
        loading: true
      }
    case 'REQUESTED_COURSE_NAME_SUCCEEDED':
      return {
        courseNameMsg: action.data,
        loading: false,
        error: false
      }
    case 'REQUESTED_COURSE_NAME_FAILED':
      return {
        loading: false,
        error: true,
        errorMsg: action.error
      }
    case 'REQUESTED_DOG':
      return {
        url: '',
        loading: true,
        error: false
      }
    case 'REQUESTED_DOG_SUCCEEDED':
      return {
        url: action.url,
        loading: false,
        error: false
      }
    case 'REQUESTED_DOG_FAILED':
      return {
        url: '',
        loading: false,
        error: true
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
