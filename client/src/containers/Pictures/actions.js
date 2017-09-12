import {LOAD, LOAD_QUERY} from './types.js'

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

export {loadPicture, loadQuery}
