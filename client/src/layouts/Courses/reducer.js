import {
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
  errorMsg: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
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
    case COURSE_LANGUAGE_FULFILLED:
      return {
        ...state,
        courseLanguage: action.payload
      }
    default:
      return state
  }
}
