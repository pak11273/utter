import {
  LOAD_LIST_TYPE,
  UPDATE_LIST_TYPE,
  CREATE,
  UPDATE_CURRENT_ROOM,
  UPDATE_ROOM_LANGUAGE,
  UPDATE_ROOM_LEVEL,
  UPDATE_ROOM_TITLE,
  REMOVE,
  ROOM_SELECT
} from './types.js'

const createRoom = room => {
  return {type: CREATE}
}

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

const roomSelect = id => {
  return {
    type: ROOM_SELECT,
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
  createRoom,
  updateCurrentRoom,
  updateRoomLevel,
  updateRoomLanguage,
  updateRoomTitle,
  roomSelect,
  removeRoom
}
