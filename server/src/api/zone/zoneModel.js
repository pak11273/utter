import mongoose, {Schema} from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import config from '../../config/config.js'

const ZoneSchema = mongoose.Schema({
  name: {
    type: String,
    default: ''
  },
  zipCodes: {
    type: Array,
    default: []
  },
  numComments: {
    type: String,
    default: ''
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('zone', ZoneSchema)
