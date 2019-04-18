"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.LevelSchema = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _courseModel = _interopRequireDefault(require("../course/course-model.js"));

var _vocabularyModel = _interopRequireDefault(require("../vocabulary/vocabulary-model.js"));

var LevelSchema = new _mongoose.default.Schema({
  title: {
    type: String,
    required: [true, "can't be blank"]
  },
  course: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: "Course",
    required: [true, "can't be blank"]
  },
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
exports.LevelSchema = LevelSchema;

var removeLinkedDocuments =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(level) {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _vocabularyModel.default.deleteMany({
              level: level._id
            });

          case 3:
            _context.next = 8;
            break;

          case 5:
            _context.prev = 5;
            _context.t0 = _context["catch"](0);
            throw _context.t0;

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 5]]);
  }));

  return function removeLinkedDocuments(_x) {
    return _ref.apply(this, arguments);
  };
}();

LevelSchema.post("findOneAndDelete", removeLinkedDocuments);

_mongoose.default.model("Level", LevelSchema);

var _default = _mongoose.default.model("Level", LevelSchema);

exports.default = _default;