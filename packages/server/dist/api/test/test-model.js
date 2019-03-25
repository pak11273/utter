"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _testModel = _interopRequireDefault(require("../test/test-model.js"));

var _userModel = _interopRequireDefault(require("../user/user-model.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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