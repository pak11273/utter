import mongoose, {Schema} from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import config from '../../config/config.js'

const DictionarySchema = mongoose.Schema({
  audioUrl: {
    type: String
  },
  base: {
    type: String
  },
  category: {
    type: String
  },
  language: {
    type: String
  },
  meta: {
    listType: {
      type: String
    }
  },
  name: {
    type: String
  },
  partOfSpeech: {
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
