import {all, fork} from 'redux-saga/effects'
import courseSaga from './layouts/Courses/sagas.js'
import userSaga from './api/user/sagas.js'
// import MyOtherSaga from './path/to/MyOtherSaga'

const sagas = [
  ...courseSaga,
  ...userSaga
  // ...MyOtherSaga
]

export default function* root() {
  yield all(sagas.map(saga => fork(saga)))
}
