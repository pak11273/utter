import jwt from "jsonwebtoken"
import axios from "axios"
import {ZONES_ASYNC} from "../types.js"

import {createAction} from "../../../utils/redux-utils.js"

export default {
  request: state => createAction(ZONES_ASYNC.REQUEST, state),
  success: zones => createAction(ZONES_ASYNC.SUCCESS, zones),
  error: error => createAction(ZONES_ASYNC.ERROR, error),
  reset: () => createAction(ZONES_ASYNC.RESET)
}
