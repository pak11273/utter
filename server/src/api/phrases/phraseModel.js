import mongoose, {Schema} from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const PhraseSchema = mongoose.Schema({
  id: {
    type: String
  },
  englishInformalTranslation: {
    phrases: {
      type: Array
    },
    audioUrl: {
      type: String
    }
  },
  englishFormalTranslation: {
    phrases: {
      type: Array
    },
    audioUrl: {
      type: String
    }
  },
  frenchInformalTranslation: {
    phrases: {
      type: Array
    },
    audioUrl: {
      type: String
    }
  },
  frenchFormalTranslation: {
    phrases: {
      type: Array
    },
    audioUrl: {
      type: String
    }
  },
  koreanInformalTranslation: {
    phrases: {
      type: Array
    },
    audioUrl: {
      type: String
    }
  },
  koreanFormalTranslation: {
    phrases: {
      type: Array
    },
    audioUrl: {
      type: String
    }
  },
  spanishInformalTranslation: {
    phrases: {
      type: Array
    },
    audioUrl: {
      type: String
    }
  },
  spanishFormalTranslation: {
    phrases: {
      type: Array
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
  level: {
    type: String
  },
  pron: {
    type: String
  }
},
  {timestamps: true}
)

module.exports = mongoose.model('phrase', PhraseSchema)
