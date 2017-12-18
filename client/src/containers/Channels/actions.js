import {
  CHANNEL_SELECT,
  SET_CHANNEL_SOCKET,
  LOAD,
  SET_CHANNEL_ID,
  SORT
} from './types.js'

const channelSelect = id => {
  return {
    type: CHANNEL_SELECT,
    payload: new Promise((resolve, reject) => {
      resolve(id)
    })
  }
}

const loadChannels = channels => {
  return {
    type: LOAD,
    payload: new Promise((resolve, reject) => {
      resolve(channels)
    })
  }
}

const setChannelId = id => {
  return {
    type: SET_CHANNEL_ID,
    payload: new Promise((resolve, reject) => {
      resolve(id)
    })
  }
}

const sortChannels = channels => {
  return {
    type: SORT,
    payload: new Promise((resolve, reject) => {
      resolve(channels)
    })
  }
}

const setChannelSocket = socket => {
  return {
    type: SET_CHANNEL_SOCKET,
    payload: new Promise((resolve, reject) => {
      resolve(socket)
    })
  }
}

export {
  channelSelect,
  loadChannels,
  setChannelId,
  setChannelSocket,
  sortChannels
}
