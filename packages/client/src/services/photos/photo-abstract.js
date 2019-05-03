/* eslint-disable */

export class PhotoAbstract {
  constructor() {
    if (new.target === PhotoAbstract) {
      throw new TypeError(
        "This is an abstract class and cannot be instantiated."
      )
    }
  }

  // parent functions
  /**
   *  converts array of Objects to an array of strings(word)
   */
  static convertData(arr) {
    return arr.map(x => x.word)
  }

  // required functions
  fetchPics() {
    throw new TypeError(
      "fetchPics cannot be used from the abstract class.  It must be overridden"
    )
  }
}
