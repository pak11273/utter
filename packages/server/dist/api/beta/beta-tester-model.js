"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.BetaTesterSchema = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var BetaTesterSchema = new _mongoose["default"].Schema({
  ageGroup: {
    type: Number
  },
  chosen: {
    type: Boolean,
    "default": false
  },
  country: String,
  currentlyLearning: String,
  dayLearningHrs: String,
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "can't be blank"],
    match: [/\S+@\S+\.\S+/, "is invalid"],
    maxlength: [255, "can't be more than 255 characters"],
    index: true
  },
  firstName: {
    type: String
  },
  gender: {
    type: String
  },
  howLongLearning: String,
  lastName: {
    type: String
  },
  lagnuagesFluent: String,
  linkedIn: {
    type: String
  },
  nativeLange: {
    type: String
  },
  whyLearning: String
}, {
  timestamps: true
});
exports.BetaTesterSchema = BetaTesterSchema;

var _default = _mongoose["default"].model("BetaTester", BetaTesterSchema);

exports["default"] = _default;