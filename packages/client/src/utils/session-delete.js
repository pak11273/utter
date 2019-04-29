import {session} from "brownies"

/**
 * Empties session storage but keeps properties from an array.
 *
 * @param {dontArr} first An array of what you want to keep
 * @returns {undefined}
 */

export const sessionDelete = (dontArr = []) => {
  Object.keys(session).map(item => {
    console.log("hmm: ", dontArr.indexOf(item))
    if (dontArr.indexOf(item) === -1) {
      console.log("item: ", item)
      delete session[item]
    }
  })
}
