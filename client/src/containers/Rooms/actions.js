import {LOAD, CREATE, UPDATE_ROOM_LEVEL, REMOVE, ROOM_SELECT} from './types.js'

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

export {loadRooms, createRoom, updateRoomLevel, roomSelect, removeRoom}
