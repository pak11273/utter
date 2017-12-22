import {
  CREATE_ROOM,
  CREATE_ROOM_FAIL,
  CREATE_ROOM_SUCCESS,
  GET_ROOMS,
  GET_ROOMS_FAIL,
  GET_ROOMS_SUCCESS,
  JOIN_ROOM,
  JOIN_ROOM_FAIL,
  JOIN_ROOM_SUCCESS,
  LOAD_SOCKET_NSPS,
  LOAD_SOCKET_NSPS_FAIL,
  LOAD_SOCKET_NSPS_SUCCESS,
  NSP_CONNECT,
  NSP_CONNECT_FAIL,
  NSP_CONNECT_SUCCESS,
  RECEIVE_MSG,
  RECEIVE_MSG_FAIL,
  RECEIVE_MSG_SUCCESS,
  RECEIVE_ROOM_META,
  RECEIVE_ROOM_META_FAIL,
  RECEIVE_ROOM_META_SUCCESS,
  SEND_MSG,
  SEND_MSG_FAIL,
  SEND_MSG_SUCCESS,
  SEND_ROOM_META,
  SEND_ROOM_META_FAIL,
  SEND_ROOM_META_SUCCESS
} from './types.js'

import io from 'socket.io-client'
import {addMsg} from '../../containers/Chat/actions.js'
import {
  updatePicture,
  updateTranslation
} from '../../containers/Pictures/actions.js'
import {loadListType} from '../../containers/Rooms/actions.js'

const createRoom = room => {
  return {
    type: 'socket',
    types: [CREATE_ROOM, CREATE_ROOM_SUCCESS, CREATE_ROOM_FAIL],
    promise: socket => socket.emit('create room', room)
  }
}

const getRooms = () => {
  return {
    type: 'socket',
    types: [GET_ROOMS, GET_ROOMS_SUCCESS, GET_ROOMS_FAIL],
    promise: socket => socket.emit('get rooms')
  }
}

const joinRoom = room => {
  return {
    type: 'socket',
    types: [JOIN_ROOM, JOIN_ROOM_SUCCESS, JOIN_ROOM_FAIL],
    promise: socket => socket.emit('join room', room)
  }
}

//TODO: remove this action?
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

const receiveMsg = body => {
  return dispatch => {
    dispatch({
      type: 'socket',
      types: [RECEIVE_MSG, RECEIVE_MSG_SUCCESS, RECEIVE_MSG_FAIL],
      promise: socket =>
        socket.on('receive  msg', body).then(result => {
          dispatch(addMsg({author: result.author, msg: result.msg}))
        })
    })
  }
}

const receiveRoomMeta = meta => {
  return dispatch => {
    dispatch({
      type: 'socket',
      types: [
        RECEIVE_ROOM_META,
        RECEIVE_ROOM_META_SUCCESS,
        RECEIVE_ROOM_META_FAIL
      ],
      promise: socket =>
        socket.on('receive room meta', meta).then(result => {
          dispatch(updatePicture(result.src))
          dispatch(loadListType(result.listType))
          dispatch(updateTranslation(result.translation))
        })
    })
  }
}

const sendMsg = msg => {
  return {
    type: 'socket',
    types: [SEND_MSG, SEND_MSG_SUCCESS, SEND_MSG_FAIL],
    promise: socket => socket.emit('send msg', msg)
  }
}

const sendRoomMeta = meta => {
  return {
    type: 'socket',
    types: [SEND_ROOM_META, SEND_ROOM_META_SUCCESS, SEND_ROOM_META_FAIL],
    promise: socket => socket.emit('send room meta', meta)
  }
}

export {
  createRoom,
  getRooms,
  joinRoom,
  loadSocketNsps,
  nspConnect,
  receiveMsg,
  receiveRoomMeta,
  sendMsg,
  sendRoomMeta
}
