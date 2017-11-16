import vocab from './vocab.js'

// combine objects to form one object to pass to random generator
let consonants = vocab.category.alphabet.consonants
let vowels = vocab.category.alphabet.vowels

const listObj = _.merge(consonants, vowels)

export default listObj
