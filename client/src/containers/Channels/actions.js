import {CHANNEL_SELECT, LOAD, LOAD_CHANNEL_ID, SORT} from './types.js'

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

const loadChannelId = id => {
  return {
    type: LOAD_CHANNEL_ID,
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

export {channelSelect, loadChannels, loadChannelId, sortChannels}
