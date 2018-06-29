import {SIGNUP_ASYNC} from '../types.js'
import {createAction} from '../../../utils/reduxUtils.js'

exports.userSignupRequest = userData => {
  return dispatch => {
    return axios.post('api/users/', userData)
  }
}

export default {
  loading: state => createAction(SIGNUP_ASYNC.LOADING, state),
  success: posts => createAction(SIGNUP_ASYNC.SUCCESS, {user}),
  error: error => createAction(SIGNUP_ASYNC.ERROR, error),
  reset: () => createAction(SIGNUP_ASYNC.RESET),
  logout: () => createAction(LOGOUT)
}
