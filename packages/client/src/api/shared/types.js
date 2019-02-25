import {createAsyncTypes} from "../../utils/redux-utils.js"

export const DELETE_DATA = "DELETE_DATA"
export const LOAD_DATA_ASYNC = createAsyncTypes("LOAD_DATA_ASYNC")
export const RESET_GLOBAL_LEVEL_ASYNC = createAsyncTypes(
  "RESET_GLOBAL_LEVEL_ASYNC"
)
