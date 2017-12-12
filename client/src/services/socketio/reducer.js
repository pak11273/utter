import {
  CREATE_ROOM,
  CREATE_ROOM_FAIL,
  CREATE_ROOM_SUCCESS,
  GET_ROOMS,
  GET_ROOMS_FAIL,
  GET_ROOMS_SUCCESS,
  LOAD_SOCKET_NSPS,
  LOAD_SOCKET_NSPS_SUCCESS,
  LOAD_SOCKET_NSPS_FAIL,
  SEND,
  SEND_SUCCESS,
  SEND_FAIL,
  CONNECT,
  CONNECT_FAIL,
  CONNECT_SUCCESS,
  NSP_CONNECT,
  NSP_CONNECT_FAIL,
  NSP_CONNECT_SUCCESS
} from './types.js'

import _ from 'lodash'

export default (state = {nsp: []}, action) => {
  switch (action.type) {
    case CREATE_ROOM:
      return {
        ...state
      }
    case CREATE_ROOM_FAIL:
      return {
        ...state
      }
    case CREATE_ROOM_SUCCESS:
      return {
        ...state,
        room: action.result
      }
    case GET_ROOMS:
      return {...state, status: 'connecting'}
    case GET_ROOMS_FAIL:
      return {...state, getRooms_status: 'getRooms connection failed'}
    case GET_ROOMS_SUCCESS:
      return {
        ...state,
        list: action.result,
        blah: 'blah'
      }
    case LOAD_SOCKET_NSPS:
      return {...state, status: 'connecting'}
    case LOAD_SOCKET_NSPS_FAIL:
      return {...state, nsp_status: 'nsp connection failed'}
    case LOAD_SOCKET_NSPS_SUCCESS:
      const socket = action.result.socket
      return {
        ...state,
        socket,
        status: 'connected'
      }
    case CONNECT:
      return {...state, status: 'connecting'}
    case CONNECT_FAIL:
      return {...state, status: 'connection failed'}
    case CONNECT_SUCCESS:
      if (_.isEmpty(state.nsp)) {
        state.nsp.push(action.result.nsp)
      }
      state.nsp.map((item, index) => {
        if (item !== action.result.nsp) {
          return action.result.nsp
        }
        return null
      })
      return {
        ...state,
        status: 'connected'
      }
    case SEND:
      return [...state]
    case SEND_FAIL:
      return [...state]
    case SEND_SUCCESS:
      return [...state]
    case NSP_CONNECT:
      return {...state, status: 'connecting'}
    case NSP_CONNECT_FAIL:
      return {...state, status: 'connection failed'}
    case NSP_CONNECT_SUCCESS:
      const blah = action.result.nsp
      return {
        ...state,
        blah,
        status: 'connected'
      }
    default:
      return state
  }
}
