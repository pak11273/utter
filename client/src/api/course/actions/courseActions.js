import jwt from 'jsonwebtoken'
import axios from 'axios'
import {COURSE_ASYNC} from '../types.js'

import {createAction} from '../../../utils/reduxUtils.js'

export default {
  request: state => createAction(COURSE_ASYNC.REQUEST, state),
  success: course => createAction(COURSE_ASYNC.SUCCESS, course),
  error: error => createAction(COURSE_ASYNC.ERROR, error),
  reset: () => createAction(COURSE_ASYNC.RESET)
}
