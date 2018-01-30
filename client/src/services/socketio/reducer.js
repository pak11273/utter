import {
  CREATE_ROOM,
  CREATE_ROOM_FAIL,
  CREATE_ROOM_SUCCESS,
  DELETE_AUDIO_BLOB,
  GET_ROOMS,
  GET_ROOMS_FAIL,
  GET_ROOMS_SUCCESS,
  JOIN_ROOM,
  JOIN_ROOM_FAIL,
  JOIN_ROOM_SUCCESS,
  LOAD_AUDIO_BLOB,
  LOAD_SOCKET_NSPS,
  LOAD_SOCKET_NSPS_SUCCESS,
  LOAD_SOCKET_NSPS_FAIL,
  RECEIVE_AUDIO_BLOB,
  RECEIVE_AUDIO_BLOB_FAIL,
  RECEIVE_AUDIO_BLOB_SUCCESS,
  RECEIVE_MSG,
  RECEIVE_MSG_FAIL,
  RECEIVE_MSG_SUCCESS,
  RECEIVE_ROOM_META,
  RECEIVE_ROOM_META_FAIL,
  RECEIVE_ROOM_META_SUCCESS,
  SEND_AUDIO_BLOB,
  SEND_AUDIO_BLOB_FAIL,
  SEND_AUDIO_BLOB_SUCCESS,
  SEND_FILE,
  SEND_FILE_FAIL,
  SEND_FILE_SUCCESS,
  SEND_MSG,
  SEND_MSG_SUCCESS,
  SEND_MSG_FAIL,
  SEND_ROOM_META,
  SEND_ROOM_META_FAIL,
  SEND_ROOM_META_SUCCESS,
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
      console.log('action: ', action)
      return {
        ...state,
        created_room: action.result,
        status: 'created a room'
      }
    case DELETE_AUDIO_BLOB:
      return {
        ...state,
        audioBlob: null
      }
    case GET_ROOMS:
      return {...state, status: 'getting a list of room'}
    case GET_ROOMS_FAIL:
      return {...state, status: 'failed to get a list of rooms'}
    case GET_ROOMS_SUCCESS:
      console.log('get rooms success: ', action)
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
    case LOAD_AUDIO_BLOB:
      return {
        ...state,
        audioBlob: action.blob
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
    case NSP_CONNECT:
      return {...state, status: 'nsp connecting'}
    case NSP_CONNECT_FAIL:
      return {...state, status: 'failed to connect to nsp'}
    case NSP_CONNECT_SUCCESS:
      return {
        ...state,
        status: 'connected to nsp'
      }
    case RECEIVE_AUDIO_BLOB:
      return {
        ...state,
        status: 'receiving audio file'
      }
    case RECEIVE_AUDIO_BLOB_FAIL:
      return {
        ...state,
        status: 'audio file failed to receive'
      }
    case RECEIVE_AUDIO_BLOB_SUCCESS:
      return {
        ...state,
        received_blob: action.result,
        status: 'audio file received'
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
    case RECEIVE_ROOM_META:
      return {
        ...state,
        status: 'receiving room meta'
      }
    case RECEIVE_ROOM_META_FAIL:
      return {
        ...state,
        status: 'room meta failed to receive'
      }
    case RECEIVE_ROOM_META_SUCCESS:
      return {
        ...state,
        pictureSrc: action.result,
        status: 'room meta received'
      }
    case SEND_AUDIO_BLOB:
      return {
        ...state,
        status: 'sending audio file'
      }
    case SEND_AUDIO_BLOB_FAIL:
      return {
        ...state,
        status: 'audio failed to send'
      }
    case SEND_AUDIO_BLOB_SUCCESS:
      return {
        ...state,
        blob: action.result,
        status: 'audio file sent'
      }
    case SEND_FILE:
      return {...state, status: 'sending file'}
    case SEND_FILE_FAIL:
      return {...state, status: 'file failed to send'}
    case SEND_FILE_SUCCESS:
      return {...state, status: 'file sent'}
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
    case SEND_ROOM_META:
      return {...state, status: 'sending room meta'}
    case SEND_ROOM_META_FAIL:
      return {...state, status: 'sending room meta failed to send'}
    case SEND_ROOM_META_SUCCESS:
      return {
        ...state,
        status: 'room meta sent'
      }
    default:
      return state
  }
}
