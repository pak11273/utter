"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.UserSchema = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _mongooseUniqueValidator = _interopRequireDefault(require("mongoose-unique-validator"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _mongoosePaginateV = _interopRequireDefault(require("mongoose-paginate-v2"));

var _courseModel = _interopRequireDefault(require("../course/course-model.js"));

var _zoneModel = _interopRequireDefault(require("../zone/zone-model.js"));

var UserSchema = new _mongoose["default"].Schema({
  age: {
    type: Number
  },
  avatar: {
    type: String,
    "default": "default.png"
  },
  blocked: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User"
  }],
  contacts: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User"
  }],
  confirmed: {
    type: Boolean,
    "default": false
  },
  createdCourses: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Course"
  }],
  forgotPasswordLocked: {
    type: Boolean,
    "default": false
  },
  hostedZone: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Zone"
  },
  gender: {
    type: String,
    "enum": ["male", "female"]
  },
  firstName: {
    type: String
  },
  isCanceled: {
    type: Boolean,
    "default": false
  },
  lastName: {
    type: String
  },
  totalRequests: {
    type: Number,
    "default": 0
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
  nativeLang: {
    type: String
  },
  reset_password_token: {
    type: String
  },
  reset_password_expires: {
    type: Date
  },
  roles: {
    type: [String],
    "default": "registeredUser"
  },
  sentRequests: [{
    username: {
      type: String,
      "default": ""
    }
  }],
  requests: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User"
  }],
  stat: {
    type: String,
    "default": "offline"
  },
  stripeId: {
    type: String
  },
  subscriptions: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Course"
  }],
  password: {
    "default": "",
    required: [true, "can't be blank"],
    type: String
  },
  hash: String,
  salt: String,
  rights: {
    type: [String]
  },
  facebook: {
    type: String,
    "default": ""
  },
  fbTokens: Array,
  google: {
    type: String,
    "default": ""
  },
  someMixed: {
    type: _mongoose["default"].Schema.Types.Mixed,
    description: "Can be any mixed type, that will be treated as JSON GraphQL Scalar Type"
  }
}, {
  timestamps: true
});
exports.UserSchema = UserSchema;
UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  this.password = this.encryptPassword(this.password);
  next();
});
UserSchema.methods = {
  authenticate: function authenticate(plainTextPwd) {
    return _bcrypt["default"].compareSync(plainTextPwd, this.password);
  },
  encryptPassword: function encryptPassword(plainTextPwd) {
    if (!plainTextPwd) {
      return "";
    } else {
      var salt = _bcrypt["default"].genSaltSync(10);

      return _bcrypt["default"].hashSync(plainTextPwd, salt);
    }
  }
};
UserSchema.plugin(_mongooseUniqueValidator["default"], {
  message: "is already taken."
});
UserSchema.plugin(_mongoosePaginateV["default"]);

var _default = _mongoose["default"].model("User", UserSchema);

exports["default"] = _default;