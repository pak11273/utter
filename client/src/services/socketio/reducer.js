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
  LOAD_SOCKET_NSPS_SUCCESS,
  LOAD_SOCKET_NSPS_FAIL,
  RECEIVE_MSG,
  RECEIVE_MSG_FAIL,
  RECEIVE_MSG_SUCCESS,
  SEND_MSG,
  SEND_MSG_SUCCESS,
  SEND_MSG_FAIL,
  NSP_CONNECT,
  NSP_CONNECT_FAIL,
  NSP_CONNECT_SUCCESS
} from './types.js'

import _ from 'lodash'

export default (state = {nsp: []}, action) => {
  switch (action.type) {
    case CREATE_ROOM:
      return {
        ...state,
        status: 'creating a room'
      }
    case CREATE_ROOM_FAIL:
      return {
        ...state,
        status: 'failed to create a room'
      }
    case CREATE_ROOM_SUCCESS:
      return {
        ...state,
        created_room: action.result,
        status: 'created a room'
      }
    case GET_ROOMS:
      return {...state, status: 'getting a list of room'}
    case GET_ROOMS_FAIL:
      return {...state, status: 'failed to get a list of rooms'}
    case GET_ROOMS_SUCCESS:
      return {
        ...state,
        status: 'got a list of rooms',
        list: action.result
      }
    case JOIN_ROOM:
      return {
        ...state,
        status: 'joining a room'
      }
    case JOIN_ROOM_FAIL:
      return {
        ...state,
        status: 'failed to join a room'
      }
    case JOIN_ROOM_SUCCESS:
      return {
        ...state,
        status: 'joined a room',
        joined_room: action.result
      }
    case LOAD_SOCKET_NSPS:
      return {...state, status: 'loading nsp socket pending'}
    case LOAD_SOCKET_NSPS_FAIL:
      return {...state, status: 'loading nsp socket failed'}
    case LOAD_SOCKET_NSPS_SUCCESS:
      const socket = action.result.socket
      return {
        ...state,
        socket,
        status: 'connected to a namespace'
      }
    case RECEIVE_MSG:
      return {
        ...state,
        status: 'receiving msg'
      }
    case RECEIVE_MSG_FAIL:
      return {...state, status: 'msg failed to receive'}
    case RECEIVE_MSG_SUCCESS:
      return {
        ...state,
        received_msg: action.result,
        status: 'msg received'
      }
    case SEND_MSG:
      return {...state, status: 'sending msg'}
    case SEND_MSG_FAIL:
      return {...state, status: 'msg failed to send'}
    case SEND_MSG_SUCCESS:
      return {
        ...state,
        msg: action.result,
        status: 'msg sent'
      }
    case NSP_CONNECT:
      return {...state, status: 'nsp connecting'}
    case NSP_CONNECT_FAIL:
      return {...state, status: 'failed to connect to nsp'}
    case NSP_CONNECT_SUCCESS:
      return {
        ...state,
        status: 'connected to nsp'
      }
    default:
      return state
  }
}
