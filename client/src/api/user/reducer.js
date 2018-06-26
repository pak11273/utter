// import orm from '../../app/schema.js'
import isEmpty from 'lodash/isEmpty'
import {createReducer} from '../../utils/reduxUtils.js'
// import * as types from './types'
import {LOGIN_ASYNC, LOAD_USER_PROFILE, SET_CURRENT_USER} from './types.js'

const initialState = {
  isAuthenticated: false,
  _id: null,
  loading: false,
  password: null,
  user: {},
  userProfile: {},
  userImage: 'default.png',
  username: null,
  email: '',
  errors: {}
}

// export function getUser(state, payload) {
//   const session = orm.session(state.entitiesReducer)
//   const {User} = session
//   const {users} = payload
//   users.forEach(user => User.parse(user))

//   return session.reduce()
// }
//

export default createReducer(initialState, {
  [LOGIN_ASYNC.LOADING]: state => ({
    ...state,
    loading: true
  }),
  [LOGIN_ASYNC.SUCCESS]: (state, action) => ({
    ...state,
    ...action.payload,
    errors: {},
    loading: false
  }),
  [LOGIN_ASYNC.ERROR]: (state, action) => ({
    ...state,
    errors: action.payload,
    loading: false
  }),
  [LOGIN_ASYNC.RESET]: state => ({
    ...state,
    loading: false,
    errors: {}
  }),
  [SET_CURRENT_USER]: (state, action) => ({
    ...state,
    isAuthenticated: !isEmpty(action.user),
    user: action.user
  }),
  [LOAD_USER_PROFILE]: (state, action) => ({
    ...state,
    userProfile: action.payload
  })
})
