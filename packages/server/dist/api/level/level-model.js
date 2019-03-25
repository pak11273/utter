"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.LevelSchema = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _courseModel = _interopRequireDefault(require("../course/course-model.js"));

var _vocabularyModel = _interopRequireDefault(require("../vocabulary/vocabulary-model.js"));

var LevelSchema = new _mongoose.default.Schema({
  level: {
    type: Number,
    required: [true, "can't be blank"]
  },
  title: {
    type: String,
    required: [true, "can't be blank"]
  },

  /* courseId: { */

  /*   type: Schema.Types.ObjectId, */

  /*   ref: "Course", */

  /*   required: [true, "can't be blank"] */

  /* }, */

  /* vocabulary: [ */

  /*   { */

  /*     type: Schema.Types.ObjectId, */

  /*     ref: "Vocabulary" */

  /*   } */

  /* ], */
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
exports.LevelSchema = LevelSchema;

_mongoose.default.model("Level", LevelSchema);

var _default = _mongoose.default.model("Level", LevelSchema);

exports.default = _default;