import {fork} from 'redux-saga/effects'
import coursSaga from './layouts/Courses/saga.js'
// import MyOtherSaga from './path/to/MyOtherSaga'

const sagas = [
  ...coursSaga
  // ...MyOtherSaga
]

export default function* root() {
  yield sagas.map(saga => fork(saga))
}
