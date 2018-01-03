import mongoose, {Schema} from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import config from '../../config/config.js'

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
      index: true
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, 'is invalid'],
      index: true
    },
    courses: [
      {
        name: {
          type: String
        },
        level: {
          type: Number,
          default: 1
        }
      }
    ],
    role: {
      type: String
    },
    utteredList: {
      type: Array,
      index: true
    },
    password: {
      type: String,
      required: [true, "can't be blank"]
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
    salt: String
  },
  {timestamps: true}
)

// masters code
UserSchema.pre('save', function(next) {
  if (!this.isModified('password')) return next()
  this.password = this.encryptPassword(this.password)
  next()
})

UserSchema.methods = {
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

// thinkster code

// UserSchema.methods.setPassword = (password) => {
//   this.salt = crypto.randomBytes(16).toString('hex');
//   this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
// };

// UserSchema.methods.generateJWT = () => {
//   let today = new Date();
//   let exp = new Date(today);
//   exp.setDate(today.getDate() + 60);

//   return jwt.sign({
//     id: this._id,
//     username: this.username,
//     exp: parseInt(exp.getTime() / 1000),
//   }, secret);
// };

// UserSchema.methods.toAuthJSON = () => {
//   return {
//     username: this.username,
//     email: this.email,
//     token: this.generateJWT()
//   };
// };

UserSchema.plugin(uniqueValidator, {message: 'is already taken.'})

module.exports = mongoose.model('User', UserSchema)
