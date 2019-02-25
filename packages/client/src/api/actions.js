/* import {LOAD_DATA_ASYNC, DELETE_DATA_ASYNC} from "./shared/types.js" */
import {RESET_GLOBAL_LEVEL_ASYNC, LOAD_DATA_ASYNC} from "./shared/types.js"
import {createAction} from "../utils/redux-utils.js"

// LOAD_DATA_ASYNC.LOAD = LOAD_DATA_ASYNC_LOAD
export const loadData = payload => createAction(LOAD_DATA_ASYNC.LOAD, payload)
export const resetGlobalLevel = () =>
  createAction(RESET_GLOBAL_LEVEL_ASYNC.RESET)
/* export const deleteData = createAction(DELETE_DATA_ASYNC.DELETE, payload) */
export const deleteData = data => ({
  type: "DELETE_DATA",
  data
})
