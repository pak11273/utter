import {all, fork} from "redux-saga/effects"

import accountSaga from "./api/user/sagas/accountSagas.js"
import preCourseSaga from "./layouts/Courses/sagas.js"
import courseSaga from "./api/course/sagas/sagas.js"
import coursesSaga from "./api/courses/sagas/coursesSagas.js"
import flashSaga from "./app/sagas/flashSagas.js"
import loginSaga from "./api/user/sagas/loginSagas.js"
import signupSaga from "./api/user/sagas/signupSagas.js"
import toolsSaga from "./layouts/Admin/Tools/sagas.js"
import levelsSaga from "./api/levels/sagas.js"
// react-admin
import {adminSaga} from "react-admin"
/* import restProvider from "ra-data-simple-rest" */
import jsonServerProvider from "ra-data-json-server"
import defaultMessages from "ra-language-english"

const messages = {
  ra: {
    action: {
      delete: "Delete",
      show: "Show",
      list: "List",
      save: "Save",
      create: "Create",
      edit: "Edit",
      cancel: "Cancel"
    }
  }
}

const authProvider = () => Promise.resolve(localStorage.getItem("AUTH_TOKEN"))
const dataProvider = jsonServerProvider("http://jsonplaceholder.typicode.com")

const i18nProvider = locale => {
  if (locale !== "en") {
    return messages[locale]
  }
  return defaultMessages
}

const reactAdminSaga = function* rootSaga() {
  yield all(
    [
      adminSaga(dataProvider, authProvider, i18nProvider)
      // add your own sagas here
    ].map(fork)
  )
}

const sagas = [
  ...reactAdminSaga,
  ...accountSaga,
  ...coursesSaga,
  ...courseSaga,
  ...preCourseSaga, // TODO: revisit, may put this all into coursesSaga
  ...flashSaga,
  ...loginSaga,
  ...signupSaga,
  ...toolsSaga,
  ...levelsSaga
]

export default function* root() {
  yield all(sagas.map(saga => fork(saga)))
}
