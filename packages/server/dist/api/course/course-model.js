"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _userModel = _interopRequireDefault(require("../user/user-model.js"));

var _termModel = require("../term/term-model.js");

var _levelModel = require("../level/level-model.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var CourseSchema = _mongoose.default.Schema({
  cdn: {
    type: _mongoose.Schema.Types.Mixed,
    default: {}
  },
  courseName: {
    type: String,
    default: "",
    required: [true, "can't be blank"]
  },
  owner: {
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
  resources: [{
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
  subscribers: {
    type: Number,
    default: 0
  },
  levels: [_levelModel.LevelSchema],
  courseDescription: {
    type: String,
    default: ""
  },
  courseImage: {
    type: String,
    default: "https://res.cloudinary.com/dgvw5b6pf/image/upload/v1536857535/course-thumbnails/fa-image_kzo6kn.png"
  }
}, {
  timestamps: true
});

CourseSchema.index({
  courseName: "text",
  courseDescription: "text"
});

CourseSchema.statics.findByUsername = function (username, callback) {
  var query = this.findOne();

  _userModel.default.findOne({
    username: username
  }).exec(callback);

  return query;
};

CourseSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
CourseSchema.set("toJSON", {
  virtuals: true
});

var _default = _mongoose.default.model("Course", CourseSchema);

exports.default = _default;