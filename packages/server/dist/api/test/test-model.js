"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _testModel = require("../test/test-model.js");

var _testModel2 = _interopRequireDefault(_testModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TestSchema = _mongoose2.default.Schema({
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

exports.default = _mongoose2.default.model("Test", TestSchema);