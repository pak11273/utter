// MUST have action types in the form npm-module-or-app/reducer/ACTION_TYPE

const LOAD_LIST_TYPE = 'utter/rooms/LOAD_LIST_TYPE'
const LOAD_LIST_TYPE_FULFILLED = 'utter/rooms/LOAD_LIST_TYPE_FULFILLED'
const UPDATE_LIST_TYPE = 'utter/rooms/UPDATE_LIST_TYPE'
const UPDATE_LIST_TYPE_FULFILLED = 'utter/rooms/UPDATE_LIST_TYPE_FULFILLED'
const LOAD_FULFILLED = 'utter/rooms/LOAD_FULFILLED'
const CREATE = 'utter/rooms/CREATE'
const UPDATE_CURRENT_ROOM = 'utter/rooms/UPDATE_CURRENT_ROOM'
const UPDATE_CURRENT_ROOM_FULFILLED =
  'utter/rooms/UPDATE_CURRENT_ROOM_FULFILLED'
const UPDATE_ROOM_LANGUAGE = 'utter/rooms/UPDATE_ROOM_LANGUAGE'
const UPDATE_ROOM_LANGUAGE_FULFILLED =
  'utter/rooms/UPDATE_ROOM_LANGUAGE_FULFILLED'
const UPDATE_ROOM_LEVEL = 'utter/rooms/UPDATE_ROOM_LEVEL'
const UPDATE_ROOM_LEVEL_FULFILLED = 'utter/rooms/UPDATE_ROOM_LEVEL_FULFILLED'
const UPDATE_ROOM_TITLE = 'utter/rooms/UPDATE_ROOM_TITLE'
const UPDATE_ROOM_TITLE_FULFILLED = 'utter/rooms/UPDATE_ROOM_TITLE_FULFILLED'
const DELETE = 'utter/rooms/DELETE'
const ROOM_SELECT = 'utter/rooms/ROOM_SELECT'
const ROOM_SELECT_FULFILLED = 'utter/rooms/ROOM_SELECT_FULFILLED'

export {
  LOAD_FULFILLED,
  LOAD_LIST_TYPE,
  LOAD_LIST_TYPE_FULFILLED,
  UPDATE_CURRENT_ROOM,
  UPDATE_CURRENT_ROOM_FULFILLED,
  UPDATE_LIST_TYPE,
  UPDATE_LIST_TYPE_FULFILLED,
  CREATE,
  UPDATE_ROOM_LANGUAGE,
  UPDATE_ROOM_LANGUAGE_FULFILLED,
  UPDATE_ROOM_LEVEL,
  UPDATE_ROOM_LEVEL_FULFILLED,
  UPDATE_ROOM_TITLE,
  UPDATE_ROOM_TITLE_FULFILLED,
  DELETE,
  ROOM_SELECT,
  ROOM_SELECT_FULFILLED
}
