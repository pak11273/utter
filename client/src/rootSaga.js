import {all, fork} from 'redux-saga/effects'
import courseSaga from './layouts/Courses/sagas.js'
import userSaga from './api/user/sagas'
import loginSaga from './api/user/sagas/loginSagas.js'
import signupSaga from './api/user/sagas/signupSagas.js'

const sagas = [...courseSaga, ...loginSaga, ...signupSaga]

export default function* root() {
  yield all(sagas.map(saga => fork(saga)))
}
