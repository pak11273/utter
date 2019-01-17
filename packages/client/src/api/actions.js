/* import {LOAD_DATA_ASYNC, DELETE_DATA_ASYNC} from "./shared/types.js" */
import {LOAD_DATA_ASYNC} from "./shared/types.js"
import {createAction} from "../utils/redux-utils.js"

// LOAD_DATA_ASYNC.LOAD = LOAD_DATA_ASYNC_LOAD
export const loadData = payload => createAction(LOAD_DATA_ASYNC.LOAD, payload)
/* export const deleteData = createAction(DELETE_DATA_ASYNC.DELETE, payload) */
export const deleteData = () => ({
  type: "DELETE_DATA"
})
