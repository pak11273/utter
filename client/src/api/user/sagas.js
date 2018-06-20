import {all, call, put, takeLatest} from 'redux-saga/effects'
import {actions} from './actions.js'
import * as types from './types'

// backend call
// TODO: convert to axios api call
// const user = () => client.getEntries()

function* getUser() {
  try {
    const users = yield call(user)
    yield put(actions.success(users.items))
  } catch (e) {
    console.log(e)
    yield put(actions.error(e))
  }
}

export default function*() {
  yield all([takeLatest(types.GET_USER.PENDING, getUser)])
}
