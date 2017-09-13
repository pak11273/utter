import {LOAD, LOAD_QUERY, SEND_TRANSLATED} from './types.js'

const loadPicture = obj => {
  return {
    type: LOAD,
    payload: new Promise((resolve, reject) => {
      resolve(obj)
    })
  }
}

const loadQuery = query => {
  return {
    type: LOAD_QUERY,
    payload: new Promise((resolve, reject) => {
      resolve(query)
    })
  }
}

const sendTranslated = query => {
  return {
    type: SEND_TRANSLATED,
    payload: new Promise((resolve, reject) => {
      resolve(query)
    })
  }
}

export {loadPicture, loadQuery, sendTranslated}
