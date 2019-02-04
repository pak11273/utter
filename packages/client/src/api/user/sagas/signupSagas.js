import {all, call, put, takeLatest} from "redux-saga/effects"

// actions
import * as types from "../types"
import {ADD_FLASH_MESSAGE} from "../../../core/types.js"

import {fetchData} from "../../../utils/apiMgr"
// import {SET_CURRENT_USER} from '../../api/user/actions.js'

export function* signup(state) {
  try {
    const {username, email, password} = state
    const url = "api/users"
    const method = "post"
    const data = {username, email, password}
    const cb = null
    const params = null

    /**
     * @param {object} data
     */
    const res = yield call(fetchData, {url, method, data, params, cb})

    if (res.status >= 200 && res.status < 300) {
      // yield put({SET_CURRENT_USER, res})
      yield put({
        type: types.SIGNUP_ASYNC.SUCCESS,
        payload: res
      })

      // yield put({
      //   type: types.SIGNUP_ASYNC.RESET
      // })

      const identifier = data.username || data.eamil
      const formattedData = {...data, identifier}

      yield put({
        type: types.LOGIN_ASYNC.REQUEST,
        ...formattedData
      })

      // TODO implement
      yield put({
        type: ADD_FLASH_MESSAGE,
        text: "You signed up successfully. Welcome aboard."
      })
    } else {
      throw res
    }
  } catch (error) {
    if (!error.response) {
      yield put({
        type: types.SIGNUP_ASYNC.ERROR,
        payload: error.message || "Something went wrong."
      })
    } else {
      yield put({
        type: types.SIGNUP_ASYNC.ERROR,
        payload: error.response.data.errors
      })
    }
  } finally {
    // pending
  }
}

function* watchSignup() {
  yield all([takeLatest(types.SIGNUP_ASYNC.REQUEST, signup)])
}

export default [watchSignup]
