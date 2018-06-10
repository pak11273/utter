import {fetchData} from '../../data/mockAPI'

import {DATA_LOADED} from './types.js'

export function loadUnitData() {
  return (dispatch, getState) => {
    fetchData().then(data => {
      dispatch({
        type: DATA_LOADED,
        payload: data
      })
    })
  }
}
