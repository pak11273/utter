"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

exports.default = _mongoose2.default.model("App", AppSchema);