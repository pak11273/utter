"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _testModel = _interopRequireDefault(require("../test/test-model.js"));

var _userModel = _interopRequireDefault(require("../user/user-model.js"));

var TestSchema = _mongoose.default.Schema({
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
}, {
  timestamps: true
});

TestSchema.index({
  testName: "text",
  testDescription: "text"
});

TestSchema.statics.findByTestName = function (testname, callback) {
  var query = this.findOne();

  _testModel.default.findOne({
    testname: testname
  }).exec(callback);

  return query;
};

TestSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
TestSchema.set("toJSON", {
  virtuals: true
});

var _default = _mongoose.default.model("Test", TestSchema);

exports.default = _default;