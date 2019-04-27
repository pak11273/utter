import {session} from "brownies"

export const sessionDelete = dontArr => {
  for (key in session) {
    if (dontArr.indexOf(key)) {
      delete session[key]
    }
  }
  return session
}
