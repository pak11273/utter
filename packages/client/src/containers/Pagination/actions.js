import capitalize from "lodash/capitalize"
import {PAGINATE_ASYNC} from "./types.js"
import {createAction} from "../../utils/redux-utils.js"
import {selectCourseProp} from "./selectors.js"

export function paginateRequest(resource, state) {
  resource = capitalize(resource)
  return (dispatch, getState) => {
    const state = getState()
    const page = selectCourseProp(state)

    // dispatch(editExistingItem('Level', currentLevel))
    dispatch({type: PAGINATE_ASYNC.REQUEST})
  }
}

// export default {
//   request: param => createAction(PAGINATE_ASYNC.REQUEST, param),
//   success: param => createAction(PAGINATE_ASYNC.SUCCESS, param),
//   error: error => createAction(PAGINATE_ASYNC.ERROR, error),
//   reset: () => createAction(PAGINATE_ASYNC.RESET)
// }
