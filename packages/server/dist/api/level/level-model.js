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

var _cloudinaryUtils = require("../../utils/cloudinary-utils.js");

var cloudinary = require("cloudinary").v2;

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
  modifier: {
    type: String,
    default: ""
  },
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

var removeLinkedDocuments = function () {
  var _ref = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee(level) {
    var vocabularies, filteredVocabularies, public_ids;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _vocabularyModel.default.find({
              level: level._id
            }).select({
              audioUrl: 1
            });

          case 3:
            vocabularies = _context.sent;
            filteredVocabularies = vocabularies.map(function (item) {
              if (item.audioUrl) {
                var public_id = (0, _cloudinaryUtils.getPublicId)(item.audioUrl);
                return public_id;
              }
            });

            if (!(filteredVocabularies.length > 0)) {
              _context.next = 10;
              break;
            }

            public_ids = filteredVocabularies.reduce(function (acc, id) {
              if (id) {
                var folder = "vocabulary-audio/";
                var public_id = folder + id;
                acc.push(public_id);
              }

              return acc;
            }, []);
            cloudinary.api.delete_resources(public_ids, {
              resource_type: "video"
            }, function (error, result) {
              console.log(error);
              console.log(result);
            });
            _context.next = 10;
            return _vocabularyModel.default.deleteMany({
              level: level._id
            });

          case 10:
            _context.next = 15;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](0);
            throw _context.t0;

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 12]]);
  }));

  return function removeLinkedDocuments(_x) {
    return _ref.apply(this, arguments);
  };
}();

LevelSchema.post("findOneAndDelete", removeLinkedDocuments);

_mongoose.default.model("Level", LevelSchema);

var _default = _mongoose.default.model("Level", LevelSchema);

exports.default = _default;