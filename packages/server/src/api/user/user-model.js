import mongoose, {Schema} from "mongoose"
import uniqueValidator from "mongoose-unique-validator"
import bcrypt from "bcrypt"
import Course from "../course/course-model.js"
import Zone from "../zone/zone-model.js"

export const UserSchema = new mongoose.Schema(
  {
    age: {
      type: Number
    },
    blocked: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    contacts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    confirmed: {
      type: Boolean,
      default: false
    },
    createdCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
      }
    ],
    forgotPasswordLocked: {
      type: Boolean,
      default: false
    },
    hostedZone: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Zone"
    },
    gender: {
      type: String,
      enum: ["male", "female"]
    },
    firstName: {
      type: String
    },
    isCanceled: {
      type: Boolean,
      default: false
    },
    lastName: {
      type: String
    },
    username: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/^[a-zA-Z0-9]+$/, "is invalid"],
      index: true
    },
    bio: String,
    ccLast4: String,
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, "is invalid"],
      maxlength: [255, "can't be more than 255 characters"],
      index: true
    },
    reset_password_token: {
      type: String
    },
    reset_password_expires: {
      type: Date
    },
    roles: {
      type: [String],
      default: "registeredUser"
    },
    stripeId: {
      type: String
    },
    subscriptions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
      }
    ],
    password: {
      default: "",
      required: [true, "can't be blank"],
      type: String
    },
    image: String,
    hash: String,
    salt: String,
    rights: {
      type: [String]
    },
    userImage: {type: String, default: "default.png"},
    facebook: {type: String, default: ""},
    fbTokens: Array,
    google: {type: String, default: ""},
    someMixed: {
      type: mongoose.Schema.Types.Mixed,
      description:
        "Can be any mixed type, that will be treated as JSON GraphQL Scalar Type"
    }
  },
  {timestamps: true}
)

// masters code
UserSchema.pre("save", function(next) {
  // TODO: this was to ensure tampered with passwords got encrypted, but is commented out because it keeps reset password from resetting correctly. Possibly remove this:
  if (!this.isModified("password")) return next() // may need to disable if implementing social media auth
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
      return ""
    } else {
      let salt = bcrypt.genSaltSync(10)
      return bcrypt.hashSync(plainTextPwd, salt)
    }
  }
}

UserSchema.plugin(uniqueValidator, {message: "is already taken."})

export default mongoose.model("User", UserSchema)
