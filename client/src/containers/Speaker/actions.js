/*  
* Speaker Actions

* Actions change things in your application
* Since this boilerplate uses a uni-directional data flow, specifically redux,
* we have these actions which are the only way your application interacts with
* your application state. This guarantees that your state is up to date and nobody
* messes it up weirdly somewhere.
*
* To add a new Action:
* 1) Import your constant
* 2) Add a function like this:
*    export function yourAction(var) {
*        return { type: YOUR_ACTION_CONSTANT, var: var }
*    }
*/

/**
* Changes the input field of the form
*
* @param  {msg} The new text of the input field
*
* @return {object} An action object with a type of CHANGE_MSG
*/

import {
  ADD_MESSAGE,
  LOAD_MESSAGES,
  SET_AUTHOR,
  SET_FINAL_TRANSCRIPT,
  SET_INTERIM_SCRIPT
} from './types.js'

const addMessage = msg => {
  return {
    type: ADD_MESSAGE,
    payload: new Promise((resolve, reject) => {
      resolve(msg)
    })
  }
}

const loadMessages = arr => {
  return {
    type: LOAD_MESSAGES,
    payload: new Promise((resolve, reject) => {
      resolve(arr)
    })
  }
}

const setAuthor = author => {
  return {
    type: SET_AUTHOR,
    payload: author
  }
}

const setFinalTranscript = transcript => {
  return {
    type: SET_FINAL_TRANSCRIPT,
    payload: new Promise((resolve, reject) => {
      resolve(transcript)
    })
  }
}

const setInterimScript = script => {
  return {
    type: SET_INTERIM_SCRIPT,
    payload: new Promise((resolve, reject) => {
      resolve(script)
    })
  }
}

export {
  addMessage,
  loadMessages,
  setAuthor,
  setFinalTranscript,
  setInterimScript
}
