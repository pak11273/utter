import mongoose, {Schema} from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const DictionarySchema = mongoose.Schema({
  id: {
    type: String
  },
  audioUrl: {
    type: String
  },
  englishTranslation: {
    name: {
      type: String
    },
    roman: {
      type: String
    },
    spelling: {
      type: String
    },
    audioUrl: {
      type: String
    }
  },
  frenchTranslation: {
    name: {
      type: String
    },
    roman: {
      type: String
    },
    spelling: {
      type: String
    },
    audioUrl: {
      type: String
    }
  },
  spanishTranslation: {
    name: {
      type: String
    },
    roman: {
      type: String
    },
    spelling: {
      type: String
    },
    audioUrl: {
      type: String
    }
  },
  meta: {
    listType: {
      type: String
    }
  },
  category: {
    type: String
  },
  language: {
    type: String
  },
  level: {
    type: String
  },
  name: {
    type: String
  },
  partsOfSpeech: {
    type: String
  },
  pron: {
    type: String
  },
  roman: {
    type: String
  },
  word: {
    type: String,
    default: ''
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('word', DictionarySchema)
