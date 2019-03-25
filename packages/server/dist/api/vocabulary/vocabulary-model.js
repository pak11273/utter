"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _levelModel = _interopRequireDefault(require("../level/level-model.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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