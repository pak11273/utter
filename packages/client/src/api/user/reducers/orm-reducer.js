import isEmpty from "lodash/isEmpty"
import {createReducer} from "../../utils/redux-utils.js"
import {
  LOGIN_ASYNC,
  LOAD_USER_PROFILE,
  LOGOUT,
  SET_CURRENT_USER
} from "./types.js"

import {LOAD_DATA_ASYNC} from "../../../api/types.js"

const initialState = {
  isAdmin: false,
  _id: null,
  isAuthenticated: false,
  loading: false,
  password: null,
  user: {},
  userProfile: {},
  userImage: "default.png",
  username: null,
  email: "",
  errors: {
    message: ""
  }
}

// export function getUser(state, payload) {
//   const session = orm.session(state.apiReducer)
//   const {User} = session
//   const {users} = payload
//   users.forEach(user => User.parse(user))

//   return session.reduce()
// }
//

export default createReducer(initialState, {
  /* SET_CURRENT_USER: state => ({ */
  /*   isAuthenticated: !isEmpty(action.user), */
  /*   user: action.user */
  /* }), */
  /* [LOGOUT]: state => ({ */
  /*   ...state */
  /* }), */
  /* [LOGIN_ASYNC.REQUEST]: state => ({ */
  /*   ...state, */
  /*   loading: true */
  /* }), */
  /* [LOGIN_ASYNC.SUCCESS]: (state, action) => ({ */
  /*   ...state, */
  /*   ...action.payload, */
  /*   errors: {}, */
  /*   isAuthenticated: true, */
  /*   loading: false */
  /* }), */
  /* [LOGIN_ASYNC.ERROR]: (state, action) => ({ */
  /*   ...state, */
  /*   errors: { */
  /*     message: action.payload */
  /*   }, */
  /*   loading: false */
  /* }), */
  /* [LOGIN_ASYNC.RESET]: state => ({ */
  /*   ...state, */
  /*   loading: false, */
  /*   errors: {} */
  /* }), */
  /* [SET_CURRENT_USER]: (state, action) => ({ */
  /*   ...state, */
  /*   isAuthenticated: !isEmpty(action.user), */
  /*   user: action.user */
  /* }), */
  [LOAD_USER]: (state, action) => ({
    ...state,
    userInfo: action.payload
  })
})
