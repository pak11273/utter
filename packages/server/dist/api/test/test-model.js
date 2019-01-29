"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _testModel = require("../test/test-model.js");

var _testModel2 = _interopRequireDefault(_testModel);

var _userModel = require("../user/user-model.js");

var _userModel2 = _interopRequireDefault(_userModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TestSchema = _mongoose2.default.Schema({
  owner: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  testId: {
    type: String,
    default: ""
  },
  testName: {
    type: String,
    default: "",
    required: [true, "can't be blank"]
  },
  testDescription: {
    type: String,
    default: ""
  },
  testSubject: {
    type: String,
    default: ""
  }
}, { timestamps: true });

TestSchema.index({ testName: "text", testDescription: "text" });

TestSchema.statics.findByTestName = function (testname, callback) {
  var query = this.findOne();

  _testModel2.default.findOne({ testname: testname }).exec(callback);
  return query;
};

TestSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

TestSchema.set("toJSON", {
  virtuals: true
});

var _default = _mongoose2.default.model("Test", TestSchema);

var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(TestSchema, "TestSchema", "src/api/test/test-model.js");
  reactHotLoader.register(_default, "default", "src/api/test/test-model.js");
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

  reactHotLoader.register(TestSchema, "TestSchema", "src/api/test/test-model.js");
  reactHotLoader.register(_default2, "default", "src/api/test/test-model.js");
  leaveModule(module);
})();

;