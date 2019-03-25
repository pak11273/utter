"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.TermSchema = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _userModel = _interopRequireWildcard(require("../user/user-model.js"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var TermSchema = new _mongoose.default.Schema({
  term: {
    type: String,
    default: "Change me"
  },
  title: {
    type: String,
    default: "Change me"
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

_mongoose.default.model("Term", TermSchema);

TermSchema.index({
  termName: "text",
  termDescription: "text"
});

TermSchema.statics.findByUsername = function (username, callback) {
  var query = this.findOne();

  _userModel.default.findOne({
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

var _default = _mongoose.default.model("Term", TermSchema);

exports.default = _default;