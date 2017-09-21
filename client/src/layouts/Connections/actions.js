import {LOAD_USER_PROFILE} from './types.js'

const loadUserProfile = obj => {
  return {
    type: LOAD_USER_PROFILE,
    payload: new Promise((resolve, reject) => {
      resolve(obj)
    })
  }
}

export {loadUserProfile}
