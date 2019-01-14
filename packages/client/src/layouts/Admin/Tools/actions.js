import {createAction} from '../../../utils/redux-utils.js'

import {LOAD_USERS_ASYNC} from './types'

export default {
  request: (state = {}) => createAction(LOAD_USERS_ASYNC.REQUEST, state)
}
