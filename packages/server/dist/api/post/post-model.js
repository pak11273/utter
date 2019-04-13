"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PostSchema = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _courseModel = _interopRequireDefault(require("../course/course-model.js"));

var _vocabularyModel = _interopRequireDefault(require("../vocabulary/vocabulary-model.js"));

var PostSchema = new _mongoose.default.Schema({
  post: {
    type: Number,
    required: [true, "can't be blank"]
  },
  title: {
    type: String,
    required: [true, "can't be blank"]
  },
  course: [{
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: "Course",
    required: [true, "can't be blank"]
  }],
  vocabulary: [{
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: "Vocabulary"
  }],
  grammar: [{
    rule: {
      type: String
    },
    example: {
      type: String
    },
    translation: {
      type: String
    },
    audioUrl: {
      type: String
    }
  }],
  examples: [{
    example: {
      type: String
    },
    translation: {
      type: String
    },
    audioUrl: {
      type: String
    }
  }],
  phrases: [{
    type: {
      type: String
    },
    formality: {
      type: String
    },
    phrase: {
      type: String
    },
    translation: {
      type: String
    },
    audioUrl: {
      type: String
    }
  }],
  notes: {
    type: String
  }
});
exports.PostSchema = PostSchema;

_mongoose.default.model("Post", PostSchema);

var _default = _mongoose.default.model("Post", PostSchema);

exports.default = _default;