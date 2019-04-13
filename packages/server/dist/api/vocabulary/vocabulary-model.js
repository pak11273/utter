"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _levelModel = _interopRequireDefault(require("../level/level-model.js"));

var VocabularySchema = new _mongoose.default.Schema({
  word: {
    type: String,
    required: [true, "can't be blank"]
  },
  gender: {
    type: String
  },
  level: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: "Level"
  },
  translation: [{
    type: String,
    required: [true, "can't be blank"]
  }]
});

_mongoose.default.model("Vocabulary", VocabularySchema);

var _default = _mongoose.default.model("Vocabulary", VocabularySchema);

exports.default = _default;