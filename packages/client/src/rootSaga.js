import {all, fork} from "redux-saga/effects"
import accountSaga from "./api/user/sagas/accountSagas.js"
import courseSaga from "./layouts/courses/sagas/index.js"
import coursesSaga from "./api/courses/sagas/coursesSagas.js"
import flashSaga from "./app/sagas/flashSagas.js"
import signupSaga from "./api/user/sagas/signupSagas.js"
import levelsSaga from "./api/level/sagas.js"

const sagas = [
  ...accountSaga,
  ...coursesSaga,
  ...courseSaga,
  ...flashSaga,
  ...signupSaga,
  ...levelsSaga
]

export default function* root() {
  yield all(sagas.map(saga => fork(saga)))
}
