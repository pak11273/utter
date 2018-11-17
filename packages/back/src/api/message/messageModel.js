import mongoose, {Schema} from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'

const MessageSchema = mongoose.Schema(
  {
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

export default mongoose.model('message', MessageSchema)
