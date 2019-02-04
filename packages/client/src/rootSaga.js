import {all, fork} from "redux-saga/effects"
import accountSaga from "./api/user/sagas/accountSagas.js"
import courseSaga from "./layouts/courses/sagas/index.js"
import coursesSaga from "./api/courses/sagas/courses-sagas.js"
import flashSaga from "./core/sagas/flashSagas.js"
import levelsSaga from "./api/level/level-sagas.js"
import signupSaga from "./api/user/sagas/signupSagas.js"
/* import socketIOSaga from "./services/socketio/sagas.js" */
/* import zoneSaga from "./api/zone/sagas/zone-sagas.js" */

const sagas = [
  ...accountSaga,
  ...coursesSaga,
  ...courseSaga,
  ...flashSaga,
  ...signupSaga,
  ...levelsSaga
  /* ...socketIOSaga, */
  /* ...zoneSaga */
]

export default function* root() {
  yield all(sagas.map(saga => fork(saga)))
}
