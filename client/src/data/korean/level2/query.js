import vocab from './vocab.js'

// combine objects to form one object to pass to random generator
let doubleConsonants = vocab.doubleConsonants
let dipthongs = vocab.dipthongs

const listObj = _.merge(doubleConsonants, dipthongs)

export default listObj
