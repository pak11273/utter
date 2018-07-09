import {fetchData} from '../../utils/apiMgr'

import {DATA_LOADED} from './types'

export function loadData(url, method, data, params, cb) {
  return (dispatch, getState) => {
    fetchData().then(data => {
      dispatch({
        type: DATA_LOADED,
        payload: data
      })
    })
  }
}
