import {combineReducers} from 'redux'
import flashMessages from './reducers/flashMessages'
import authReducer from './reducers/auth'
import challengeReducer from './containers/Challenge/reducer.js'
import channelReducer from './containers/Channels/reducer.js'
import courseReducer from './layouts/Courses/reducer.js'
import roomReducer from './containers/Rooms/reducer.js'
import chatReducer from './containers/Chat/reducer.js'
import chatPanelReducer from './containers/ChatPanel/reducer.js'
import pictureReducer from './containers/Pictures/reducer.js'
import socketReducer from './services/socketio/reducer.js'
import userReducer from './layouts/Connections/reducer.js'
import utteredReducer from './containers/Uttered/reducer.js'
import vocabReducer from './layouts/Admin/Vocabulary/reducer.js'

export default combineReducers({
  authReducer,
  challengeReducer,
  channelReducer,
  chatReducer,
  chatPanelReducer,
  courseReducer,
  flashMessages,
  pictureReducer,
  roomReducer,
  socketReducer,
  vocabReducer,
  userReducer,
  utteredReducer
})
