import mongoose, {Schema} from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import config from '../../config/config.js'

const MessageSchema = mongoose.Schema({
  channel_id: {
    type: String,
    default: ''
  },
  room_id: {
    type: String,
    default: ''
  },
  user: Object,
  message: {
    type: String,
    default: ''
  }
},
  {timestamps: true}
)

module.exports = mongoose.model('message', MessageSchema)
