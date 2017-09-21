import {LOAD_UTTERED_LIST, UPDATE_UTTERED_LIST} from './types.js'

const loadUtteredList = list => {
  return {
    type: LOAD_UTTERED_LIST,
    payload: new Promise((resolve, reject) => {
      resolve(list)
    })
  }
}

const updateUtteredList = list => {
  return {
    type: UPDATE_UTTERED_LIST,
    payload: new Promise((resolve, reject) => {
      resolve(list)
    })
  }
}

export {loadUtteredList, updateUtteredList}
