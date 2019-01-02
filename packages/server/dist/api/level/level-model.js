"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelSchema = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _userModel = require("../user/user-model.js");

var _userModel2 = _interopRequireDefault(_userModel);

var _termModel = require("../term/term-model.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LevelSchema = exports.LevelSchema = new _mongoose.Schema({
  level: Number,
  title: {
    type: String,
    default: "Change me"
  },
  terms: [_termModel.TermSchema],
  levelAuthor: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "User"
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

exports.default = _mongoose2.default.model("Level", LevelSchema);