import * as types from '../types'

export const setLoader = () => {
  return {
    type: types.LOADER_ASYNC.CREATE,
    payload: {loading: true}
  }
}

export const unsetLoader = () => {
  return {
    type: types.LOADER_ASYNC.DELETE,
    payload: {loading: true}
  }
}

export const resetLoader = () => {
  return {
    type: types.LOADER_ASYNC.RESET,
    payload: {loading: true}
  }
}
