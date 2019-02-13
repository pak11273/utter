import {combineReducers} from "redux"
import {reduceReducers} from "./utils/redux-utils.js"

import apiReducer from "./api/reducer.js"
import flashMessages from "./core/reducers/flashMessages"
import challengeReducer from "./containers/Challenge/reducer.js"
import channelReducer from "./containers/Channels/reducer.js"
import contactReducer from "./layouts/contact/reducers.js"
import courseReducer from "./layouts/courses/reducers"
import coursesReducer from "./api/courses/reducers/courses-reducer.js"
import entitiesCrudReducer from "./api/entities/reducers/crudReducer.js"
import roomReducer from "./containers/Rooms/reducer.js"
import chatReducer from "./layouts/zones/containers/chat/reducer.js"
import chatPanelReducer from "./containers/ChatPanel/reducer.js"
import clubReducer from "./api/club/reducer.js"
import levelReducer from "./api/level/reducer.js"
import loaderReducer from "./core/reducers/loaderReducer.js"
import modalReducer from "./containers/modals/reducer.js"
import paginateReducer from "./containers/Pagination/reducer.js"
import pictureReducer from "./containers/Pictures/reducer.js"
/* import socketReducer from "./services/socketio/reducer.js" */
import tabsReducer from "./containers/Tabs/reducer.js"
import termReducer from "./api/term/reducer.js"
import toggleFooterReducer from "./core/reducers/toggleFooterReducer.js"
import userReducer from "./api/user/reducers/generic.js"
import utteredReducer from "./containers/Uttered/reducer.js"
import {routerReducer} from "react-router-redux"

const combinedReducers = combineReducers({
  apiReducer,
  challengeReducer,
  channelReducer,
  contactReducer,
  chatReducer,
  chatPanelReducer,
  clubReducer,
  courseReducer,
  coursesReducer,
  flashMessages,
  levelReducer,
  loaderReducer,
  modalReducer,
  paginateReducer,
  pictureReducer,
  roomReducer,
  router: routerReducer,
  /* socketReducer, */
  tabsReducer,
  termReducer,
  toggleFooterReducer,
  userReducer,
  utteredReducer
})

const rootReducer = reduceReducers(combinedReducers, entitiesCrudReducer)

export default rootReducer
