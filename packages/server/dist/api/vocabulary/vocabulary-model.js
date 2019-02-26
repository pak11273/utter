"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VocabularySchema = undefined;

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

var _courseModel = require("../course/course-model.js");

var _courseModel2 = _interopRequireDefault(_courseModel);

var _levelModel = require("../level/level-model.js");

var _levelModel2 = _interopRequireDefault(_levelModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VocabularySchema = exports.VocabularySchema = new _mongoose.Schema({
  word: {
    type: String,
    required: [true, "can't be blank"]
  },
  courseId: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: [true, "can't be blank"]
  },
  gender: {
    types: String
  },
  levelId: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Level",
    required: [true, "can't be blank"]
  },
  translation: [{
    type: String,
    required: [true, "can't be blank"]
  }]
});

_mongoose2.default.model("Vocabulary", VocabularySchema);

var _default = _mongoose2.default.model("Vocabulary", VocabularySchema);

var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(VocabularySchema, "VocabularySchema", "src/api/vocabulary/vocabulary-model.js");
  reactHotLoader.register(_default, "default", "src/api/vocabulary/vocabulary-model.js");
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

  reactHotLoader.register(VocabularySchema, "VocabularySchema", "src/api/vocabulary/vocabulary-model.js");
  reactHotLoader.register(_default2, "default", "src/api/vocabulary/vocabulary-model.js");
  leaveModule(module);
})();

;