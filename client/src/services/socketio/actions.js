import {
  GET_ROOMS,
  GET_ROOMS_FAIL,
  GET_ROOMS_SUCCESS,
  CREATE_ROOM,
  CREATE_ROOM_FAIL,
  CREATE_ROOM_SUCCESS,
  LOAD_SOCKET_NSPS,
  LOAD_SOCKET_NSPS_FAIL,
  LOAD_SOCKET_NSPS_SUCCESS,
  SEND,
  SEND_SUCCESS,
  SEND_FAIL,
  NSP_CONNECT,
  NSP_CONNECT_FAIL,
  NSP_CONNECT_SUCCESS,
  CONNECT,
  CONNECT_FAIL,
  CONNECT_SUCCESS
} from './types.js'

import io from 'socket.io-client'

const createRoom = room => {
  return {
    type: 'socket',
    types: [CREATE_ROOM, CREATE_ROOM_SUCCESS, CREATE_ROOM_FAIL],
    promise: socket => socket.createRoom(room)
  }
}

const getRooms = list => {
  return {
    type: 'socket',
    types: [GET_ROOMS, GET_ROOMS_SUCCESS, GET_ROOMS_FAIL],
    promise: socket => socket.getRooms()
  }
}

const socketConnect = socket => {
  return {
    type: 'socket',
    types: [CONNECT, CONNECT_SUCCESS, CONNECT_FAIL],
    promise: socket => socket.connect()
  }
}

//TODO: remove this action
const loadSocketNsps = socket => {
  return {
    type: 'socket',
    types: [LOAD_SOCKET_NSPS, LOAD_SOCKET_NSPS_SUCCESS, LOAD_SOCKET_NSPS_FAIL],
    promise: socket => socket.connect()
  }
}

const nspConnect = namespace => {
  return {
    type: 'socket',
    types: [GET_ROOMS, GET_ROOMS_SUCCESS, GET_ROOMS_FAIL],
    promise: socket => socket.nspConnect(namespace)
  }
}

export {createRoom, getRooms, loadSocketNsps, nspConnect, socketConnect}
