import {combineReducers} from 'redux'
import login from './loginReducer.js'
import signup from './signupReducer.js'

export default combineReducers({
  login,
  signup
})
