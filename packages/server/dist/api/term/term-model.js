"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TermSchema = undefined;

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _ref;

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TermSchema = exports.TermSchema = new _mongoose.Schema((_ref = {
  term: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Term"
  }
}, (0, _defineProperty3.default)(_ref, "term", Number), (0, _defineProperty3.default)(_ref, "title", {
  type: String,
  default: "Change me"
}), (0, _defineProperty3.default)(_ref, "grammar", String), _ref));

TermSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

TermSchema.set("toJSON", {
  virtuals: true
});

_mongoose2.default.model("Term", TermSchema);

TermSchema.index({ termName: "text", termDescription: "text" });

TermSchema.statics.findByUsername = function (username, callback) {
  var query = this.findOne();

  _userModel2.default.findOne({ username: username }).exec(callback);
  return query;
};

TermSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

TermSchema.set("toJSON", {
  virtuals: true
});

var _default = _mongoose2.default.model("Term", TermSchema);

var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(TermSchema, "TermSchema", "src/api/term/term-model.js");
  reactHotLoader.register(_default, "default", "src/api/term/term-model.js");
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

  reactHotLoader.register(TermSchema, "TermSchema", "src/api/term/term-model.js");
  reactHotLoader.register(_default2, "default", "src/api/term/term-model.js");
  leaveModule(module);
})();

;