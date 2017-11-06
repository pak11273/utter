import {combineReducers} from 'redux'
import flashMessages from './reducers/flashMessages'
import auth from './reducers/auth'
import challengeReducer from './containers/Challenge/reducers.js'
import channelReducer from './containers/Channels/reducers.js'
import roomReducer from './containers/Rooms/reducers'
import speakerReducer from './containers/Speaker/reducer.js'
import pictureReducer from './containers/Pictures/reducers.js'
import utteredReducer from './containers/Uttered/reducer.js'
import userReducer from './layouts/Connections/reducers.js'

import {SET_NAME} from './containers/Rooms/types.js' // this may not belong here?

export default combineReducers({
  auth,
  challengeReducer,
  channelReducer,
  flashMessages,
  pictureReducer,
  roomReducer,
  speakerReducer,
  userReducer,
  utteredReducer
})
