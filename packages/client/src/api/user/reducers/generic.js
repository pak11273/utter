import {createReducer} from "../../../utils/redux-utils.js"

const initialState = {
  loading: false,
  errors: {
    message: ""
  }
}

export default createReducer(initialState, {
  /*   [FETCH_USER_ASYNC.FETCH]: state => ({ */
  /*     ...state, */
  /*     loading: true */
  /*   }), */
  /*   [FETCH_USER_ASYNC.SUCCESS]: (state, action) => ({ */
  /*     ...state, */
  /*     ...action.payload, */
  /*     errors: {}, */
  /*     loading: false */
  /*   }), */
  /*   [FETCH_USER_ASYNC.ERROR]: (state, action) => ({ */
  /*     ...state, */
  /*     errors: { */
  /*       message: action.payload */
  /*     }, */
  /*     loading: false */
  /*   }) */
})
