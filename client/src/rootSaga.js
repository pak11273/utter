import {all, fork} from 'redux-saga/effects'

import accountSaga from './api/user/sagas/accountSagas.js'
import preCourseSaga from './layouts/Courses/sagas.js'
import courseSaga from './api/course/sagas/sagas.js'
import coursesSaga from './api/courses/sagas/coursesSagas.js'
import flashSaga from './app/sagas/flashSagas.js'
import loginSaga from './api/user/sagas/loginSagas.js'
import signupSaga from './api/user/sagas/signupSagas.js'
import toolsSaga from './layouts/Admin/Tools/sagas.js'
import levelsSaga from './api/levels/sagas.js'

const sagas = [
  ...accountSaga,
  ...coursesSaga,
  ...courseSaga,
  ...preCourseSaga, //TODO: revisit, may put this all into coursesSaga
  ...flashSaga,
  ...loginSaga,
  ...signupSaga,
  ...toolsSaga,
  ...levelsSaga
]

export default function* root() {
  yield all(sagas.map(saga => fork(saga)))
}
