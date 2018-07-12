import {all, fork} from 'redux-saga/effects'
import courseSaga from './layouts/Courses/sagas.js'
import flashSaga from './app/sagas/flashSagas.js'
import loginSaga from './api/user/sagas/loginSagas.js'
import signupSaga from './api/user/sagas/signupSagas.js'
import toolsSaga from './layouts/Admin/Tools/sagas.js'

const sagas = [
  ...courseSaga,
  ...flashSaga,
  ...loginSaga,
  ...signupSaga,
  ...toolsSaga
]

export default function* root() {
  yield all(sagas.map(saga => fork(saga)))
}
