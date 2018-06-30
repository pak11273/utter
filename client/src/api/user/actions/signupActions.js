import {SIGNUP_ASYNC} from '../types.js'
import {createAction} from '../../../utils/reduxUtils.js'

export default {
  request: state => createAction(SIGNUP_ASYNC.REQUEST, state),
  success: posts => createAction(SIGNUP_ASYNC.SUCCESS, {user}),
  error: error => createAction(SIGNUP_ASYNC.ERROR, error),
  reset: () => createAction(SIGNUP_ASYNC.RESET),
  logout: () => createAction(LOGOUT)
}
