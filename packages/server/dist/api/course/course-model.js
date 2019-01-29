"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _userModel = require("../user/user-model.js");

var _userModel2 = _interopRequireDefault(_userModel);

var _termModel = require("../term/term-model.js");

var _levelModel = require("../level/level-model.js");

var _levelModel2 = _interopRequireDefault(_levelModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  teachingLang: {
    type: String,
    default: ""
  },
  usingLang: {
    type: String,
    default: ""
  },
  subscribers: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  levels: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Level"
  }],
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

var _default = _mongoose2.default.model("Course", CourseSchema);

var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(CourseSchema, "CourseSchema", "src/api/course/course-model.js");
  reactHotLoader.register(_default, "default", "src/api/course/course-model.js");
  leaveModule(module);
})();

;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(CourseSchema, "CourseSchema", "src/api/course/course-model.js");
  reactHotLoader.register(_default2, "default", "src/api/course/course-model.js");
  leaveModule(module);
})();

;