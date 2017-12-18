import {
  LOAD_LIST_TYPE,
  UPDATE_LIST_TYPE,
  UPDATE_CURRENT_ROOM,
  UPDATE_ROOM_LANGUAGE,
  UPDATE_ROOM_LEVEL,
  UPDATE_ROOM_TITLE,
  REMOVE,
  JOIN_ROOM
} from './types.js'

const loadListType = type => {
  return {
    type: LOAD_LIST_TYPE,
    payload: new Promise((resolve, reject) => {
      resolve(type)
    })
  }
}

const updateListType = type => {
  return {
    type: UPDATE_LIST_TYPE,
    payload: new Promise((resolve, reject) => {
      resolve(type)
    })
  }
}

const joinRoom = id => {
  return {
    type: JOIN_ROOM,
    payload: new Promise((resolve, reject) => {
      resolve(id)
    })
  }
}

const updateRoomLanguage = lang => {
  return {
    type: UPDATE_ROOM_LANGUAGE,
    payload: new Promise((resolve, reject) => {
      resolve(lang)
    })
  }
}

const updateCurrentRoom = room => {
  return {
    type: UPDATE_CURRENT_ROOM,
    payload: new Promise((resolve, reject) => {
      resolve(room)
    })
  }
}

const updateRoomLevel = level => {
  return {
    type: UPDATE_ROOM_LEVEL,
    payload: new Promise((resolve, reject) => {
      resolve(level)
    })
  }
}

const updateRoomTitle = title => {
  return {
    type: UPDATE_ROOM_TITLE,
    payload: new Promise((resolve, result) => {
      resolve(title)
    })
  }
}

const removeRoom = () => {
  return {type: REMOVE}
}

export {
  loadListType,
  updateListType,
  updateCurrentRoom,
  updateRoomLevel,
  updateRoomLanguage,
  updateRoomTitle,
  joinRoom,
  removeRoom
}
