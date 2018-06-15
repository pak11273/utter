import {combineReducers} from 'redux'
import flashMessages from './reducers/flashMessages'
import authReducer from './reducers/auth'
import challengeReducer from './containers/Challenge/reducer.js'
import channelReducer from './containers/Channels/reducer.js'
import courseReducer from './layouts/Courses/reducer.js'
import entitiesCrudReducer from './api/entities/reducers.js'
import entitiesReducer from './app/reducer.js'
import roomReducer from './containers/Rooms/reducer.js'
import chatReducer from './containers/Chat/reducer.js'
import chatPanelReducer from './containers/ChatPanel/reducer.js'
import mechReducer from './layouts/Courses/features/mechs/reducer.js'
import pilotReducer from './layouts/Courses/features/Pilots/reducer.js'
import pictureReducer from './containers/Pictures/reducer.js'
import phraseReducer from './layouts/Admin/Phrases/reducer.js'
import socketReducer from './services/socketio/reducer.js'
import tabsReducer from './containers/Tabs/reducer.js'
import termsReducer from './api/terms/reducer.js'
import toggleFooterReducer from './reducers/toggleFooterReducer.js'
import userReducer from './layouts/Connections/reducer.js'
import unitReducer from './layouts/Courses/features/UnitInfo/reducer.js'
import utteredReducer from './containers/Uttered/reducer.js'
import vocabReducer from './layouts/Admin/Vocabulary/reducer.js'
import {routerReducer} from 'react-router-redux'

export default combineReducers({
  authReducer,
  challengeReducer,
  channelReducer,
  chatReducer,
  chatPanelReducer,
  courseReducer,
  entitiesReducer,
  entitiesCrudReducer,
  flashMessages,
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
  vocabReducer,
  unitReducer,
  userReducer,
  utteredReducer
})
