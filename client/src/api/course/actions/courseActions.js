import jwt from 'jsonwebtoken'
import axios from 'axios'
import {COURSE_ASYNC} from '../types.js'

import {createAction} from '../../../utils/reduxUtils.js'

export default {
  create: state => createAction(COURSE_ASYNC.CREATE, state),
  request: state => createAction(COURSE_ASYNC.REQUEST, state),
  update: state => createAction(COURSE_ASYNC.UPDATE, state),
  delete: state => createAction(COURSE_ASYNC.DELETE, state),
  success: course => createAction(COURSE_ASYNC.SUCCESS, course),
  error: error => createAction(COURSE_ASYNC.ERROR, error),
  reset: () => createAction(COURSE_ASYNC.RESET)
}
