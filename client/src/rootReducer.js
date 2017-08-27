import {combineReducers} from 'redux'
import flashMessages from './reducers/flashMessages'
import auth from './reducers/auth'
import landingSearch from './reducers/landingSearch.js'
import users from './reducers/reducer-users.js'

export default combineReducers({
  flashMessages,
  auth,
  landingSearch,
  users
})
