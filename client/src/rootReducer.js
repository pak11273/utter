import {combineReducers} from 'redux'
import flashMessages from './app/reducers/flashMessages'
import challengeReducer from './containers/Challenge/reducer.js'
import channelReducer from './containers/Channels/reducer.js'
import courseReducer from './layouts/Courses/reducer.js'
import entitiesReducer from './api/entities/reducer.js'
import roomReducer from './containers/Rooms/reducer.js'
import chatReducer from './containers/Chat/reducer.js'
import chatPanelReducer from './containers/ChatPanel/reducer.js'
import clubReducer from './api/club/reducer.js'
import levelReducer from './api/level/reducer.js'
import mechReducer from './layouts/Courses/features/Mechs/reducer.js'
import pilotReducer from './layouts/Courses/features/Pilots/reducer.js'
import pictureReducer from './containers/Pictures/reducer.js'
import phraseReducer from './layouts/Admin/Phrases/reducer.js'
import socketReducer from './services/socketio/reducer.js'
import tabsReducer from './containers/Tabs/reducer.js'
import termsReducer from './api/terms/reducer.js'
import toolsReducer from './layouts/Admin/Tools/reducers.js'
import toggleFooterReducer from './app/reducers/toggleFooterReducer.js'
import userReducer from './api/user/reducers'
import unitReducer from './layouts/Courses/features/UnitInfo/reducer.js'
import utteredReducer from './containers/Uttered/reducer.js'
import vocabReducer from './layouts/Admin/Vocabulary/reducer.js'
import {routerReducer} from 'react-router-redux'
import {loadingBarReducer} from 'react-redux-loading-bar'

export default combineReducers({
  challengeReducer,
  channelReducer,
  chatReducer,
  chatPanelReducer,
  clubReducer,
  courseReducer,
  entitiesReducer,
  flashMessages,
  levelReducer,
  loadingBar: loadingBarReducer,
  mechReducer,
  pictureReducer,
  pilotReducer,
  phraseReducer,
  roomReducer,
  router: routerReducer,
  socketReducer,
  tabsReducer,
  termsReducer,
  toggleFooterReducer,
  toolsReducer,
  vocabReducer,
  unitReducer,
  userReducer,
  utteredReducer
})
