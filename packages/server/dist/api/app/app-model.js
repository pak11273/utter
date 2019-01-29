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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AppSchema = _mongoose2.default.Schema({
  appName: {
    type: String,
    default: "",
    required: [true, "can't be blank"]
  },
  appAuthor: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  appImage: {
    type: String,
    default: "https://res.cloudinary.com/dgvw5b6pf/image/upload/v1545873897/game-thumbnails/jon-tyson-762647-unsplash_vlvsyk"
  },
  appPages: {
    type: Number,
    default: -1
  },
  appRef: [{
    type: _mongoose.Schema.Types.Mixed,
    default: {}
  }],
  appDescription: {
    type: String,
    default: ""
  }
}, { timestamps: true });

AppSchema.index({ appName: "text", appDescription: "text" });

AppSchema.statics.findByAppname = function (appname, callback) {
  var query = this.findOne();

  App.findOne({ appname: appname }).exec(callback);
  return query;
};

AppSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

AppSchema.set("toJSON", {
  virtuals: true
});

var _default = _mongoose2.default.model("App", AppSchema);

var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(AppSchema, "AppSchema", "src/api/app/app-model.js");
  reactHotLoader.register(_default, "default", "src/api/app/app-model.js");
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

  reactHotLoader.register(AppSchema, "AppSchema", "src/api/app/app-model.js");
  reactHotLoader.register(_default2, "default", "src/api/app/app-model.js");
  leaveModule(module);
})();

;