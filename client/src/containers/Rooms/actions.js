import {
  LOAD,
  CREATE,
  UPDATE_ROOM_LANGUAGE,
  UPDATE_ROOM_LEVEL,
  REMOVE,
  ROOM_SELECT
} from './types.js'

const loadRooms = obj => {
  return {
    type: LOAD,
    payload: new Promise((resolve, reject) => {
      resolve(obj)
    })
  }
}

const roomSelect = id => {
  return {
    type: ROOM_SELECT,
    payload: new Promise((resolve, reject) => {
      resolve(id)
    })
  }
}

const createRoom = () => {
  return {type: CREATE}
}

const updateRoomLanguage = lang => {
  return {
    type: UPDATE_ROOM_LANGUAGE,
    payload: new Promise((resolve, reject) => {
      resolve(lang)
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

const removeRoom = () => {
  return {type: REMOVE}
}

export {
  loadRooms,
  createRoom,
  updateRoomLevel,
  updateRoomLanguage,
  roomSelect,
  removeRoom
}
