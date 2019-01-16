import {LOAD_DATA_ASYNC, DELETE_DATA_ASYNC} from "./shared/types.js"
import {createAction} from "../utils/redux-utils.js"

export const loadData = payload => createAction(LOAD_DATA_ASYNC.LOAD, payload)
export const deleteData = payload =>
  createAction(DELETE_DATA_ASYNC.DELETE, payload)
