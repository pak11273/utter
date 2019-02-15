import size from "lodash/size"

const Rand = class Rand {
  constructor(thing) {
    if (Array.isArray(thing)) {
      this.array = thing
    } else if (thing !== null && typeof thing === "object") {
      this.objectList = thing
    }
  }

  // function to get random object
  get obj() {
    const max = size(this.objectList)
    const x = this.getRandIntInclusive(0, max - 1)
    const objKeys = Object.keys(this.objectList)
    const keyName = objKeys[x]
    const objValue = this.objectList[keyName]
    return {
      [keyName]: objValue
    }
  }

  // from an array
  get word() {
    const max = this.array.length - 1
    const x = this.getRandIntInclusive(0, max)
    return this.array[x]
  }

  getRandIntInclusive = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min // The maximum is inclusive and the minimum is inclusive
  }
}

export default Rand
