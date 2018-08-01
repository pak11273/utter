import {combineReducers} from 'redux'
import {reduceReducers} from './utils/reduxUtils.js'

import flashMessages from './app/reducers/flashMessages'
import challengeReducer from './containers/Challenge/reducer.js'
import channelReducer from './containers/Channels/reducer.js'
import courseReducer from './api/course/reducers'
import coursesReducer from './api/courses/reducers/coursesReducer.js'
import entitiesReducer from './api/entities/reducers/reducer.js'
import entitiesCrudReducer from './api/entities/reducers/crudReducer.js'
import roomReducer from './containers/Rooms/reducer.js'
import chatReducer from './containers/Chat/reducer.js'
import chatPanelReducer from './containers/ChatPanel/reducer.js'
import clubReducer from './api/club/reducer.js'
import levelReducer from './api/levels/reducer.js'
import pictureReducer from './containers/Pictures/reducer.js'
import phraseReducer from './layouts/Admin/Phrases/reducer.js'
import socketReducer from './services/socketio/reducer.js'
import tabsReducer from './containers/Tabs/reducer.js'
import termsReducer from './api/terms/reducer.js'
import toolsReducer from './layouts/Admin/Tools/reducers.js'
import toggleFooterReducer from './app/reducers/toggleFooterReducer.js'
import userReducer from './api/user/reducers'
import utteredReducer from './containers/Uttered/reducer.js'
import vocabReducer from './layouts/Admin/Vocabulary/reducer.js'
import {routerReducer} from 'react-router-redux'
import {loadingBarReducer} from 'react-redux-loading-bar'

const combinedReducers = combineReducers({
  challengeReducer,
  channelReducer,
  chatReducer,
  chatPanelReducer,
  clubReducer,
  courseReducer,
  coursesReducer,
  entitiesReducer,
  flashMessages,
  levelReducer,
  loadingBar: loadingBarReducer,
  pictureReducer,
  phraseReducer,
  roomReducer,
  router: routerReducer,
  socketReducer,
  tabsReducer,
  termsReducer,
  toggleFooterReducer,
  toolsReducer,
  vocabReducer,
  userReducer,
  utteredReducer
})

const rootReducer = reduceReducers(combinedReducers, entitiesCrudReducer)

export default rootReducer
