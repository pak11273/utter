import {push} from "react-router-redux"
import {all, call, put, select, takeLatest} from "redux-saga/effects"
import {fetchData} from "../../../utils/apiMgr"
import {ADD_FLASH_MESSAGE} from "../../../app/types.js"

// types
import * as types from "../types"
import {MODAL_RESET} from "../../../containers/modals/types.js"

// actions
// import {resetModal} from '../../../containers/modals/actions.js'

function* deleteZone(state) {
  const {owner, zoneId, zoneName} = state
  const getAuthId = state => state.apiReducer.User.items[0]
  const authId = yield select(getAuthId)
  const url = `/api/zones/${authId}/${owner}/${zoneId}/${zoneName}`
  const htmlReadyUrl = encodeURI(url)
  try {
    const url = htmlReadyUrl
    const method = "delete"
    const data = {}
    const cb = null
    const params = null

    const res = yield call(fetchData, {url, method, data, params, cb})

    if (res.status >= 200 && res.status < 300) {
      yield put({
        type: types.ZONE_ASYNC.SUCCESS,
        payload: res.data
      })

      // TODO reset modalReducer
      yield put({
        type: MODAL_RESET
      })

      yield put(push(`/zones/created`))
    } else {
      throw res
    }
  } catch (error) {
    if (!error.response) {
      yield put({
        type: types.ZONE_ASYNC.ERROR,
        payload: error.message || "Something went wrong."
      })
    } else {
      console.log("error: ", error.response.statusText)
      const err = error.response.statusText
      yield put({
        type: types.ZONE_ASYNC.ERROR,
        payload: err
      })
    }
  } finally {
    // no op
  }
}

export function* fetchZone(state) {
  const {owner, zoneId, zoneName} = state
  const getAuthId = state => state.apiReducer.User.items[0]
  const authId = yield select(getAuthId)
  const url = `/api/zones/${authId}/${owner}/${zoneId}/${zoneName}`
  const htmlReadyUrl = encodeURI(url)

  try {
    const url = htmlReadyUrl
    const method = "get"
    const data = {}
    const cb = null
    const params = null

    /**
     * @param {string} url ex.'/api/zones/:authId/:owner/:zoneId/:zoneName'
     */
    const res = yield call(fetchData, {url, method, data, params, cb})

    if (res.status >= 200 && res.status < 300) {
      yield put({
        type: types.ZONE_ASYNC.SUCCESS,
        payload: res.data
      })

      yield put(push(`/zone/${zoneId}/${zoneName}/edit`))
    } else {
      throw res
    }
  } catch (error) {
    if (!error.response) {
      yield put({
        type: types.ZONE_ASYNC.ERROR,
        payload: error.message || "Something went wrong."
      })
    } else {
      console.log("error: ", error.response.statusText)
      const err = error.response.statusText
      yield put({
        type: types.ZONE_ASYNC.ERROR,
        payload: err
      })
    }
  } finally {
    // no op
  }
}

export function* updateZone(state) {
  const {owner, zoneId, zoneName} = state
  const getAuthId = state => state.apiReducer.User.items[0]
  const authId = yield select(getAuthId)
  /**
   * @param {string} url ex.'/api/zones/:authId/:owner/:zoneId/:zoneName'
   */
  const url = `/api/zones/${authId}/${owner}/${zoneId}/${zoneName}`
  const htmlReadyUrl = encodeURI(url)
  try {
    const url = htmlReadyUrl
    const method = "put"
    const data = state
    const cb = null
    const params = null

    const res = yield call(fetchData, {url, method, data, params, cb})

    if (res.status >= 200 && res.status < 300) {
      yield put({
        type: types.ZONE_ASYNC.SUCCESS,
        payload: res.data
      })

      yield put({
        type: ADD_FLASH_MESSAGE,
        message: {
          type: "success",
          text: "Your zone was updated successfully."
        }
      })

      res.data.data.owner = res.data.data.owner
      yield call(fetchZone, res.data.data)

      yield put(push(`/zone/${zoneId}/${zoneName}/edit`))
    } else {
      throw res
    }
  } catch (error) {
    if (!error.response) {
      yield put({
        type: types.ZONE_ASYNC.ERROR,
        payload: error.message || "Something went wrong."
      })
    } else {
      console.log("error: ", error.response.statusText)
      const err = error.response.statusText
      yield put({
        type: types.ZONE_ASYNC.ERROR,
        payload: err
      })
    }
  } finally {
    // no op
  }
}

function* watchZone() {
  yield all([
    takeLatest(types.ZONE_ASYNC.DELETE, deleteZone),
    takeLatest(types.ZONE_ASYNC.REQUEST, fetchZone),
    takeLatest(types.ZONE_ASYNC.UPDATE, updateZone)
  ])
}

export default [watchZone]
