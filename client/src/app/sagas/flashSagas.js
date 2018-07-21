import types from '../types'

// TODO: implement
function* createFlash() {
  console.log('hi there')
}

function* watchCreateFlash() {
  yield all([takeLatest(types.FLASH_ASYNC.REQUEST, createFlash)])
}
