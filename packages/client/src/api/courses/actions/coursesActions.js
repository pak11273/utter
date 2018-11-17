import jwt from 'jsonwebtoken'
import axios from 'axios'
import {COURSES_ASYNC} from '../types.js'

import {createAction} from '../../../utils/reduxUtils.js'

export default {
  request: state => createAction(COURSES_ASYNC.REQUEST, state),
  success: courses => createAction(COURSES_ASYNC.SUCCESS, courses),
  error: error => createAction(COURSES_ASYNC.ERROR, error),
  reset: () => createAction(COURSES_ASYNC.RESET)
}
