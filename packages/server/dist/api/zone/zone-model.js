"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _mongoosePaginateV = _interopRequireDefault(require("mongoose-paginate-v2"));

var _userModel = _interopRequireDefault(require("../user/user-model.js"));

var _courseModel = _interopRequireDefault(require("../course/course-model.js"));

var _termModel = require("../term/term-model.js");

var _levelModel = require("../level/level-model.js");

var ZoneSchema = _mongoose["default"].Schema({
  ageGroup: {
    type: String,
    "default": "Any age"
  },
  app: {
    type: String
  },
  banned: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User"
  }],
  course: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Course"
  },
  courseLevel: {
    type: Number
  },
  maxOccupants: {
    type: Number,
    "default": 1
  },
  occupants: {
    type: Number,
    "default": 1
  },
  zoneName: {
    type: String,
    "default": "",
    required: [true, "can't be blank"]
  },
  owner: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User"
  },
  password: {
    type: String,
    "default": ""
  },
  "private": {
    type: Boolean,
    "default": false
  },
  zoneImage: {
    type: String,
    "default": "https://res.cloudinary.com/dgvw5b6pf/image/upload/v1545873897/game-thumbnails/jon-tyson-762647-unsplash_vlvsyk"
  },
  zonePages: {
    type: Number,
    "default": -1
  },
  zoneRef: [{
    type: _mongoose["default"].Schema.Types.Mixed,
    "default": {}
  }],
  teachingLang: {
    type: String,
    "default": ""
  },
  usingLang: {
    type: String,
    "default": ""
  },
  zoneDescription: {
    type: String,
    "default": ""
  }
}, {
  timestamps: true
});

var addZoneToUser = function () {
  var _ref = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee(zone) {
    var updated;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _userModel["default"].findByIdAndUpdate(zone.owner, {
              hostedZone: zone._id
            }).exec();

          case 3:
            updated = _context.sent;
            return _context.abrupt("return", updated);

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", _context.t0);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function addZoneToUser(_x) {
    return _ref.apply(this, arguments);
  };
}();

ZoneSchema.index({
  app: "text",
  usingLang: "text",
  teachingLang: "text",
  zoneName: "text"
});
ZoneSchema.index({
  zoneName: "text",
  zoneDescription: "text"
});

ZoneSchema.statics.findByUsername = function (username, callback) {
  var query = this.findOne();

  _userModel["default"].findOne({
    username: username
  }).exec(callback);

  return query;
};

ZoneSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
ZoneSchema.set("toJSON", {
  virtuals: true
});
ZoneSchema.post("save", addZoneToUser);
ZoneSchema.plugin(_mongoosePaginateV["default"]);

var _default = _mongoose["default"].model("Zone", ZoneSchema);

exports["default"] = _default;