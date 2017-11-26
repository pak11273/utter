import {SET_AUTHOR} from './types.js'

const setAuthor = author => {
  return {
    type: SET_AUTHOR,
    payload: author
  }
}

export {setAuthor}
