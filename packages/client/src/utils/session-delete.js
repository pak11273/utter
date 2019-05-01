/* eslint-disable */
import {session} from "brownies"

/**
 * Empties session storage but keeps properties from an array. The code does not use Object.keys|values|entries, because they won't work if an entry is "undefined". So for...in was used.
 *
 * @param {dontArr} first An array of what you want to keep
 * @returns {undefined}
 */

export const sessionDelete = (dontArr = []) => {
  for (const key in session) {
    if (dontArr.indexOf(key) === -1) {
      delete session[key]
    }
  }
}
