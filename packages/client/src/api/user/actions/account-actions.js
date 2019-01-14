import {ACCOUNT_ASYNC} from '../types.js'
import {createAction} from '../../../utils/redux-utils.js'

export default {
  update: state => createAction(ACCOUNT_ASYNC.UPDATE, state),
  success: posts => createAction(ACCOUNT_ASYNC.SUCCESS, {user}),
  error: error => createAction(ACCOUNT_ASYNC.ERROR, error),
  reset: () => createAction(ACCOUNT_ASYNC.RESET)
}
