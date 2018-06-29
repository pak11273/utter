import mongoose, {Schema} from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../../config/config.js'

const UserSchema = new mongoose.Schema(
  {
    siteAdmin: {
      type: Boolean
    },
    username: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
      index: true
    },
    bio: String,
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, 'is invalid'],
      index: true
    },
    coursesTeaching: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    coursesLearning: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    reset_password_token: {
      type: String
    },
    reset_password_expires: {
      type: Date
    },
    role: {
      type: String
    },
    utteredList: {
      type: Array,
      index: true
    },
    password: {
      type: String,
      required: [true, "can't be blank"],
      default: ''
    },
    subscriptions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Language'
      }
    ],
    bio: String,
    image: String,
    hash: String,
    salt: String,
    userImage: {type: String, default: 'default.png'},
    facebook: {type: String, default: ''},
    fbTokens: Array,
    google: {type: String, default: ''}
  },
  {timestamps: true}
)

// masters code
UserSchema.pre('save', function(next) {
  // TODO: this was to ensure tampered with passwords got encrypted, but is commented out because it keeps reset password from resetting correctly. Possibly remove this:
  if (!this.isModified('password')) return next() // may need to disable if implementing social media auth
  this.password = this.encryptPassword(this.password)
  next()
})

UserSchema.methods = {
  // check password
  authenticate: function(plainTextPwd) {
    return bcrypt.compareSync(plainTextPwd, this.password)
  },
  // hash password
  // TODO: make this async(research timed attacks on password)
  encryptPassword: function(plainTextPwd) {
    if (!plainTextPwd) {
      return ''
    } else {
      let salt = bcrypt.genSaltSync(10)
      return bcrypt.hashSync(plainTextPwd, salt)
    }
  }
}

UserSchema.plugin(uniqueValidator, {message: 'is already taken.'})

module.exports = mongoose.model('User', UserSchema)
