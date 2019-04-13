"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.UserSchema = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _mongooseUniqueValidator = _interopRequireDefault(require("mongoose-unique-validator"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _courseModel = _interopRequireDefault(require("../course/course-model.js"));

var UserSchema = new _mongoose.default.Schema({
  age: {
    type: Number
  },
  blocked: [{
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: "User"
  }],
  contacts: [{
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: "User"
  }],
  confirmed: {
    type: Boolean,
    default: false
  },
  createdCourses: [{
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: "Course"
  }],
  forgotPasswordLocked: {
    type: Boolean,
    default: false
  },
  gender: {
    type: String,
    enum: ["male", "female"]
  },
  firstName: {
    type: String
  },
  isDeleted: {
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
  subscriptions: [{
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: "Course"
  }],
  password: {
    default: "",
    required: [true, "can't be blank"],
    type: String
  },
  image: String,
  hash: String,
  salt: String,
  scopes: [{
    String: String
  }],
  userImage: {
    type: String,
    default: "default.png"
  },
  facebook: {
    type: String,
    default: ""
  },
  fbTokens: Array,
  google: {
    type: String,
    default: ""
  },
  someMixed: {
    type: _mongoose.default.Schema.Types.Mixed,
    description: "Can be any mixed type, that will be treated as JSON GraphQL Scalar Type"
  }
}, {
  timestamps: true
}); // masters code

exports.UserSchema = UserSchema;
UserSchema.pre("save", function (next) {
  // TODO: this was to ensure tampered with passwords got encrypted, but is commented out because it keeps reset password from resetting correctly. Possibly remove this:
  if (!this.isModified("password")) return next(); // may need to disable if implementing social media auth

  this.password = this.encryptPassword(this.password);
  next();
});
UserSchema.methods = {
  // check password
  authenticate: function authenticate(plainTextPwd) {
    return _bcrypt.default.compareSync(plainTextPwd, this.password);
  },
  // hash password
  // TODO: make this async(research timed attacks on password)
  encryptPassword: function encryptPassword(plainTextPwd) {
    if (!plainTextPwd) {
      return "";
    } else {
      var salt = _bcrypt.default.genSaltSync(10);

      return _bcrypt.default.hashSync(plainTextPwd, salt);
    }
  }
};
UserSchema.plugin(_mongooseUniqueValidator.default, {
  message: "is already taken."
});

var _default = _mongoose.default.model("User", UserSchema);

exports.default = _default;