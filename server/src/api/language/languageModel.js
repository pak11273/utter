import mongoose, {Schema} from 'mongoose'

const LanguageSchema = mongoose.Schema({
  name: {
    type: String
  },
  subscribers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  levels: {
    type: Number,
    vocabulary: Array,
    grammar: String
  }
})

module.exports = mongoose.model('Language', LanguageSchema)
