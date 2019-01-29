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
  level: Number,
  title: {
    type: String,
    default: "Change me"
  },
  Course: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Course"
  }
});

LevelSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

LevelSchema.set("toJSON", {
  virtuals: true
});

_mongoose2.default.model("Level", LevelSchema);

/* LevelSchema.index({levelTitle: "text"}) */

LevelSchema.statics.findByUsername = function (username, callback) {
  var query = this.findOne();

  _userModel2.default.findOne({ username: username }).exec(callback);
  return query;
};

LevelSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

LevelSchema.set("toJSON", {
  virtuals: true
});

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