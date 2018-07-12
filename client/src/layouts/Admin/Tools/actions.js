import {createAction} from '../../../utils/reduxUtils.js'

import {LOAD_USERS_ASYNC} from './types'

export default {
  request: state => createAction(LOAD_USERS_ASYNC.REQUEST, state)
}
