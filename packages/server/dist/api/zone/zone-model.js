"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _userModel = _interopRequireWildcard(require("../user/user-model.js"));

var _courseModel = _interopRequireDefault(require("../course/course-model.js"));

var _termModel = require("../term/term-model.js");

var _levelModel = require("../level/level-model.js");

var ZoneSchema = _mongoose.default.Schema({
  ageGroup: {
    type: String,
    default: "Any age"
  },
  app: {
    type: String,
    default: "Total Recall"
  },
  banned: [{
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: "User"
  }],
  course: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: "Course"
  },
  courseLevel: {
    type: Number,
    default: 1
  },
  maxOccupants: {
    type: Number,
    default: 1
  },
  occupants: {
    type: Number,
    default: 1
  },
  zoneName: {
    type: String,
    default: "",
    required: [true, "can't be blank"]
  },
  owner: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: "User"
  },
  zoneImage: {
    type: String,
    default: "https://res.cloudinary.com/dgvw5b6pf/image/upload/v1545873897/game-thumbnails/jon-tyson-762647-unsplash_vlvsyk"
  },
  zonePages: {
    type: Number,
    default: -1
  },
  zoneRef: [{
    type: _mongoose.default.Schema.Types.Mixed,
    default: {}
  }],
  teachingLang: {
    type: String,
    default: ""
  },
  usingLang: {
    type: String,
    default: ""
  },
  zoneDescription: {
    type: String,
    default: ""
  }
}, {
  timestamps: true
});

ZoneSchema.index({
  zoneName: "text",
  zoneDescription: "text"
});

ZoneSchema.statics.findByUsername = function (username, callback) {
  var query = this.findOne();

  _userModel.default.findOne({
    username: username
  }).exec(callback);

  return query;
};

ZoneSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
ZoneSchema.set("toJSON", {
  virtuals: true
});

var _default = _mongoose.default.model("Zone", ZoneSchema);

exports.default = _default;