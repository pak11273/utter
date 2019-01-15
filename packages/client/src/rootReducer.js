import {combineReducers} from "redux"
import {reduceReducers} from "./utils/redux-utils.js"

import apiReducer from "./api/reducer.js"
import flashMessages from "./app/reducers/flashMessages"
import challengeReducer from "./containers/Challenge/reducer.js"
import channelReducer from "./containers/Channels/reducer.js"
import courseReducer from "./layouts/courses/reducers"
import coursesReducer from "./api/courses/reducers/coursesReducer.js"
import entitiesCrudReducer from "./api/entities/reducers/crudReducer.js"
import roomReducer from "./containers/Rooms/reducer.js"
import chatReducer from "./containers/Chat/reducer.js"
import chatPanelReducer from "./containers/ChatPanel/reducer.js"
import clubReducer from "./api/club/reducer.js"
import levelReducer from "./api/level/reducer.js"
import loaderReducer from "./app/reducers/loaderReducer.js"
import modalReducer from "./containers/Modals/reducer.js"
import paginateReducer from "./containers/Pagination/reducer.js"
import pictureReducer from "./containers/Pictures/reducer.js"
import phraseReducer from "./layouts/Admin/Phrases/reducer.js"
import socketReducer from "./services/socketio/reducer.js"
import tabsReducer from "./containers/Tabs/reducer.js"
import termReducer from "./api/term/reducer.js"
import toolsReducer from "./layouts/Admin/Tools/reducers.js"
import toggleFooterReducer from "./app/reducers/toggleFooterReducer.js"
import userReducer from "./api/user/reducers/generic.js"
import utteredReducer from "./containers/Uttered/reducer.js"
import vocabReducer from "./layouts/Admin/Vocabulary/reducer.js"
import {routerReducer} from "react-router-redux"

const combinedReducers = combineReducers({
  apiReducer,
  challengeReducer,
  channelReducer,
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
  phraseReducer,
  roomReducer,
  router: routerReducer,
  socketReducer,
  tabsReducer,
  termReducer,
  toggleFooterReducer,
  toolsReducer,
  vocabReducer,
  userReducer,
  utteredReducer
})

const rootReducer = reduceReducers(combinedReducers, entitiesCrudReducer)

export default rootReducer
