"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _userModel = require("../user/user-model.js");

var _userModel2 = _interopRequireDefault(_userModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TermSchema = new _mongoose.Schema({
  course: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Course"
  },
  level: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Level"
  },
  word: {
    type: String,
    default: "Change me"
  },
  translation: {
    type: String,
    default: "Change me"
  },
  audio: {
    type: String,
    default: "audio.mp3"
  }
});

TermSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

TermSchema.set("toJSON", {
  virtuals: true
});

var LevelSchema = new _mongoose.Schema({
  course: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Course"
  },
  level: Number,
  name: {
    type: String,
    default: "Change me"
  },
  terms: [TermSchema],
  grammar: String
});

LevelSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

LevelSchema.set("toJSON", {
  virtuals: true
});

_mongoose2.default.model("Level", LevelSchema);

var CourseSchema = _mongoose2.default.Schema({
  cdn: {
    type: _mongoose.Schema.Types.Mixed,
    default: {}
  },
  courseId: {
    type: String,
    default: ""
  },
  courseName: {
    type: String,
    default: "",
    required: [true, "can't be blank"]
  },
  courseAuthor: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  courseMode: {
    type: String,
    default: "draft"
  },
  coursePages: {
    type: Number,
    default: -1
  },
  courseRef: [{
    type: _mongoose.Schema.Types.Mixed,
    default: {}
  }],
  favorite: {
    type: Boolean,
    default: false
  },
  teachingLang: {
    type: String,
    default: ""
  },
  usingLang: {
    type: String,
    default: ""
  },
  tags: {
    type: Array,
    default: ""
  },
  subscribers: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  levels: [LevelSchema],
  // levels: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: 'Level'
  //   }
  // ],
  courseDescription: {
    type: String,
    default: ""
  },
  courseImage: {
    type: String,
    default: "https://res.cloudinary.com/dgvw5b6pf/image/upload/v1536857535/course-thumbnails/fa-image_kzo6kn.png"
  }
}, { timestamps: true });

CourseSchema.index({ courseName: "text", courseDescription: "text" });

CourseSchema.statics.findByUsername = function (username, callback) {
  var query = this.findOne();

  _userModel2.default.findOne({ username: username }).exec(callback);
  return query;
};

CourseSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

CourseSchema.set("toJSON", {
  virtuals: true
});

exports.default = _mongoose2.default.model("Course", CourseSchema);