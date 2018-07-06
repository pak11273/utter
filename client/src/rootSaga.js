import {all, fork} from 'redux-saga/effects'
import courseSaga from './layouts/Courses/sagas.js'
import flashSaga from './app/sagas/flashSagas.js'
import loginSaga from './api/user/sagas/loginSagas.js'
import signupSaga from './api/user/sagas/signupSagas.js'

const sagas = [...courseSaga, ...flashSaga, ...loginSaga, ...signupSaga]

export default function* root() {
  yield all(sagas.map(saga => fork(saga)))
}
