import {LOAD, CREATE, UPDATE, REMOVE, ROOM_SELECT} from './types.js'

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

const updateRoom = () => {
  return {type: UPDATE}
}

const removeRoom = () => {
  return {type: REMOVE}
}

export {loadRooms, createRoom, updateRoom, roomSelect, removeRoom}
