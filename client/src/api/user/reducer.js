// import orm from '../../app/schema.js'
// import {createReducer} from '../../utils/reducerUtils.js'
import * as types from './types'

// const initialState = {}

// export function getUser(state, payload) {
//   const session = orm.session(state.entitiesReducer)
//   const {User} = session
//   const {users} = payload
//   users.forEach(user => User.parse(user))

//   return session.reduce()
// }

// export default createReducer(initialState, {
//   [types.GET_USER_ASYNC.PENDING]: state => ({
//     ...state,
//     loading: true
//   }),
//   [types.GET_USER_ASYNC.SUCCESS]: (state, action) => ({
//     ...state,
//     posts: action.posts,
//     loading: false
//   }),
//   [types.GET_USER_ASYNC.ERROR]: state => ({
//     ...state,
//     loading: false
//   })
// })
//

export default function userReducer(state = {}, action) {
  switch (action.type) {
    case 'LOAD_USER_SUCCESS':
      return {
        ...state,
        info: action.payload
      }
    default:
      return state
  }
}
