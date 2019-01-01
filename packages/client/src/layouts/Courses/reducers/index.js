import {combineReducers} from "redux"
import courseReducer from "./generic.js"
import courseCrudReducer from "./crud.js"

export default combineReducers({
  courseReducer,
  courseCrudReducer
})
