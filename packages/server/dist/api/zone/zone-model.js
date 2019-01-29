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

var _userModel = require("../user/user-model.js");

var _userModel2 = _interopRequireDefault(_userModel);

var _termModel = require("../term/term-model.js");

var _levelModel = require("../level/level-model.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ZoneSchema = _mongoose2.default.Schema({
  zoneName: {
    type: String,
    default: "",
    required: [true, "can't be blank"]
  },
  zoneAuthor: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  zoneImage: {
    type: String,
    default: "https://res.cloudinary.com/dgvw5b6pf/image/upload/v1545873897/game-thumbnails/jon-tyson-762647-unsplash_vlvsyk"
  },
  zonePages: {
    type: Number,
    default: -1
  },
  zoneRef: [{
    type: _mongoose.Schema.Types.Mixed,
    default: {}
  }],
  teachingLang: {
    type: String,
    default: ""
  },
  usingLang: {
    type: String,
    default: ""
  },
  zoneDescription: {
    type: String,
    default: ""
  }
}, { timestamps: true });

ZoneSchema.index({ zoneName: "text", zoneDescription: "text" });

ZoneSchema.statics.findByUsername = function (username, callback) {
  var query = this.findOne();

  _userModel2.default.findOne({ username: username }).exec(callback);
  return query;
};

ZoneSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

ZoneSchema.set("toJSON", {
  virtuals: true
});

var _default = _mongoose2.default.model("Zone", ZoneSchema);

var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(ZoneSchema, "ZoneSchema", "src/api/zone/zone-model.js");
  reactHotLoader.register(_default, "default", "src/api/zone/zone-model.js");
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

  reactHotLoader.register(ZoneSchema, "ZoneSchema", "src/api/zone/zone-model.js");
  reactHotLoader.register(_default2, "default", "src/api/zone/zone-model.js");
  leaveModule(module);
})();

;