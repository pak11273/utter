import {session} from "brownies"

/**
 * Empties session storage but keeps properties from an array.
 *
 * @param {dontArr} first An array of what you want to keep
 * @returns {undefined}
 */

export const sessionDelete = (dontArr = []) => {
  Object.keys(session).map(item => {
    if (dontArr.indexOf(item) === -1) {
      delete session[item]
    }
  })
}
