var Rando = class Rando {
  constructor(array) {
    this.array = array
  }

  get word() {
    let max = this.array.length - 1
    let x = this.getRandomIntInclusive(0, max)
    return this.array[x]
  }

  getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
  }
}

export default Rando
