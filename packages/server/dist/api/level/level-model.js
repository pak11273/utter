"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelSchema = undefined;

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

var _courseModel = require("../course/course-model.js");

var _courseModel2 = _interopRequireDefault(_courseModel);

var _termModel = require("../term/term-model.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LevelSchema = exports.LevelSchema = new _mongoose.Schema({
  level: {
    type: Number,
    required: [true, "can't be blank"]
  },
  title: {
    type: String,
    required: [true, "can't be blank"]
  },
  courseId: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: [true, "can't be blank"]
  },
  vocabulary: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Vocabulary"
  }],
  grammar: [{
    rule: { type: String },
    example: { type: String },
    translation: { type: String },
    audioUrl: { type: String }
  }],
  examples: [{
    example: { type: String },
    translation: { type: String },
    audioUrl: { type: String }
  }],
  phrases: [{
    type: { type: String },
    formality: { type: String },
    phrase: { type: String },
    translation: { type: String },
    audioUrl: { type: String }
  }],
  notes: {
    type: String
  }
});

_mongoose2.default.model("Level", LevelSchema);

var _default = _mongoose2.default.model("Level", LevelSchema);

var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(LevelSchema, "LevelSchema", "src/api/level/level-model.js");
  reactHotLoader.register(_default, "default", "src/api/level/level-model.js");
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

  reactHotLoader.register(LevelSchema, "LevelSchema", "src/api/level/level-model.js");
  reactHotLoader.register(_default2, "default", "src/api/level/level-model.js");
  leaveModule(module);
})();

;