"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _faker2 = _interopRequireDefault(require("faker"));

var _cuid = _interopRequireDefault(require("cuid"));

var _isEmpty = require("lodash/isEmpty");

var _data = require("../../seeds/data.js");

var _zoneModel = _interopRequireDefault(require("./zone-model.js"));

var ObjectId = _mongoose.default.Types.ObjectId;
var _default = {
  faker: function faker(req, res, next) {
    var randNum = function randNum() {
      return Math.floor(Math.random() * Math.floor(30));
    };

    for (var i = 0; i < 1000; ++i) {
      var zone = new _zoneModel.default();
      zone.zoneName = _faker2.default.random.arrayElement(["Aenean Donec venenatis", "Praesent egestas neque", "Fusce vel duii Fusce vel dui", "Nullam accumsan lorem", "Curabitur a felis", "Pellentesque auctor neque", "Fusce vel duFusce vel duii", "Mauris sollicitudin fermentum", "Suspendisse enim turpis", "Mauris sollicitudin fermentum", "Nullam nuNullam nulla ero eros"]);
      zone.owner = _faker2.default.random.arrayElement(["5caa11c126bd462e4023657b", "5ccd04389b251025231a8446", "5ccd08c796e018284f6180a5", "5ccd041b9b251025231a8445", "5ccd0a0f96e018284f6180a6", "5ccd03d29b251025231a8444"]);
      zone.app = _faker2.default.random.arrayElement(["Carousel", "General Chat"]);
      zone.course = _faker2.default.random.arrayElement(["5cb25c6515bf2342bfddfc0c"]);
      zone.teachingLang = _faker2.default.random.arrayElement(_data.languageOptions);
      zone.usingLang = _faker2.default.random.arrayElement(_data.languageOptions);
      zone.zoneId = (0, _cuid.default)();
      zone.zoneDescription = _faker2.default.lorem.paragraph();
      zone.zoneImage = _faker2.default.image.image();
      zone.courseLevel = randNum();
      zone.save(function (err) {
        if (err) throw err;
      });
    }

    res.json(zone);
  }
};
exports.default = _default;