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
  SEND_MSG,
  SEND_MSG_FAIL,
  SEND_MSG_SUCCESS
} from './types.js'

import io from 'socket.io-client'
import {addMsg} from '../../containers/Chat/actions.js'

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

const sendMsg = msg => {
  return {
    type: 'socket',
    types: [SEND_MSG, SEND_MSG_SUCCESS, SEND_MSG_FAIL],
    promise: socket => socket.emit('send msg', msg)
  }
}

const receiveMsg = body => {
  return dispatch => {
    dispatch({
      type: 'socket',
      types: [RECEIVE_MSG, RECEIVE_MSG_SUCCESS, RECEIVE_MSG_FAIL],
      promise: socket =>
        socket.on('receive  msg', body).then(result => {
          console.log('result: ', result)
          dispatch(addMsg({author: result.author, msg: result.msg}))
        })
    })
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

export {
  createRoom,
  getRooms,
  joinRoom,
  loadSocketNsps,
  nspConnect,
  receiveMsg,
  sendMsg
}
