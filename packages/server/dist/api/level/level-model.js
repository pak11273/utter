"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.LevelSchema = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _userModel = _interopRequireWildcard(require("../user/user-model.js"));

var _courseModel = _interopRequireDefault(require("../course/course-model.js"));

var _termModel = require("../term/term-model.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var LevelSchema = new _mongoose.Schema({
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