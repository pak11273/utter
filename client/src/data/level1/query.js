import vocab from './vocab.js'

// combine objects to form one object to pass to random generator
let consonants = vocab.alphabet.consonants
let vowels = vocab.alphabet.vowels

const listObj = _.merge(consonants, vowels)

export default listObj
