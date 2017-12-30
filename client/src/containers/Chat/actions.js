import {
  ADD_AUDIO,
  ADD_MSG,
  LOAD_MSG_LIST,
  SET_CURRENT_MSG,
  UPDATE_MSG
} from './types.js'

const loadMsgList = list => {
  return {
    type: LOAD_MSG_LIST,
    list
  }
}

const addAudio = obj => {
  return {
    type: ADD_AUDIO,
    obj
  }
}

const addMsg = body => {
  return {
    type: ADD_MSG,
    body
  }
}

const setCurrentMsg = msg => {
  return {
    type: SET_CURRENT_MSG,
    msg
  }
}

const updateMsg = msg => {
  return {
    type: UPDATE_MSG,
    msg
  }
}

export {addAudio, addMsg, loadMsgList, setCurrentMsg, updateMsg}
