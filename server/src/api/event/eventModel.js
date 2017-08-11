import mongoose, {Schema} from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import config from '../../config/config.js'

const EventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      lowercase: true
    }
  },
  {timestamps: true}
)

// masters code
EventSchema.pre('save', function(next) {
  if (!this.isModified('password')) return next()
  this.password = this.encryptPassword(this.password)
  next()
})

EventSchema.methods = {
  // check password
  authenticate: function(plainTextPwd) {
    return bcrypt.compareSync(plainTextPwd, this.password)
  },
  // hash password
  // todo: make this async(research timed attacks on password)
  encryptPassword: function(plainTextPwd) {
    if (!plainTextPwd) {
      return ''
    } else {
      let salt = bcrypt.genSaltSync(10)
      return bcrypt.hashSync(plainTextPwd, salt)
    }
  }
}

EventSchema.plugin(uniqueValidator, {message: 'is already taken.'})

module.exports = mongoose.model('Event', EventSchema)
