import * as types from '../types'
import {all, takeLatest} from 'redux-saga/effects'

// TODO: implement
function* createFlash() {
  console.log('hi there')
}

function* watchCreateFlash() {
  yield all([takeLatest(types.FLASH_ASYNC.REQUEST, createFlash)])
}

export default [watchCreateFlash]
