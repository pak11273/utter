"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _userModel = _interopRequireDefault(require("../user/user-model.js"));

var _termModel = require("../term/term-model.js");

var _levelModel = _interopRequireDefault(require("../level/level-model.js"));

var _mongoosePaginateV = _interopRequireDefault(require("mongoose-paginate-v2"));

var CourseSchema = _mongoose["default"].Schema({
  cdn: {
    type: _mongoose["default"].Schema.Types.Mixed,
    "default": {}
  },
  levelSort: {
    type: Array,
    "default": []
  },
  title: {
    type: String,
    "default": "",
    required: [true, "can't be blank"]
  },
  owner: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User"
  },
  courseMode: {
    type: String,
    "default": "draft"
  },
  coursePages: {
    type: Number,
    "default": -1
  },
  resource: {
    type: String
  },
  teachingLang: {
    type: String,
    "default": ""
  },
  usingLang: {
    type: String,
    "default": ""
  },
  subscribers: {
    type: Array,
    "default": []
  },
  subscriberCount: {
    type: Number,
    "default": 0
  },
  levels: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Level"
  }],
  courseDescription: {
    type: String,
    "default": ""
  },
  courseImage: {
    type: String,
    "default": "https://res.cloudinary.com/dgvw5b6pf/image/upload/v1536857535/course-thumbnails/fa-image_kzo6kn.png"
  }
}, {
  timestamps: true
});

CourseSchema.index({
  title: "text",
  resource: "text"
});

CourseSchema.statics.findByUsername = function (username, callback) {
  var query = this.findOne();

  _userModel["default"].findOne({
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
CourseSchema.plugin(_mongoosePaginateV["default"]);

var _default = _mongoose["default"].model("Course", CourseSchema);

exports["default"] = _default;