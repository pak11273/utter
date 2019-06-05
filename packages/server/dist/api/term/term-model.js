"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.TermSchema = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _userModel = _interopRequireWildcard(require("../user/user-model.js"));

var TermSchema = new _mongoose["default"].Schema({
  term: {
    type: String,
    "default": "Change me"
  },
  title: {
    type: String,
    "default": "Change me"
  },
  grammar: String
});
exports.TermSchema = TermSchema;
TermSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
TermSchema.set("toJSON", {
  virtuals: true
});

_mongoose["default"].model("Term", TermSchema);

TermSchema.index({
  termName: "text",
  termDescription: "text"
});

TermSchema.statics.findByUsername = function (username, callback) {
  var query = this.findOne();

  _userModel["default"].findOne({
    username: username
  }).exec(callback);

  return query;
};

TermSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
TermSchema.set("toJSON", {
  virtuals: true
});

var _default = _mongoose["default"].model("Term", TermSchema);

exports["default"] = _default;