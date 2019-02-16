"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zoneCreateSchema = exports.zoneDescriptionTooLong = exports.zoneDescriptionNotLongEnough = exports.zoneTooLong = exports.zoneNotLongEnough = undefined;

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

var _yup = require("yup");

var yup = _interopRequireWildcard(_yup);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var zoneNotLongEnough = exports.zoneNotLongEnough = "Zone names must be at least 6 characters";
var zoneTooLong = exports.zoneTooLong = "Zone names cannot exceed 20 characters";
var zoneDescriptionNotLongEnough = exports.zoneDescriptionNotLongEnough = "Zone descriptions must be at least 30 characters";
var zoneDescriptionTooLong = exports.zoneDescriptionTooLong = "Zone descriptions cannot exceed 110 characters";

var zoneCreateSchema = exports.zoneCreateSchema = yup.object().shape({
  app: yup.string().required("An app is required"),
  course: yup.string().required("A course you subscribe to is required"),
  courseLevel: yup.string().required("A course level is required"),
  ageGroup: yup.string().required("Age restrictions are required"),
  zoneName: yup.string().min(3, zoneNotLongEnough).max(40, zoneTooLong).required("A zone name is required"),
  zoneDescription: yup.string().min(30, zoneDescriptionNotLongEnough).max(110, zoneDescriptionTooLong).required("A zone description is required")
});
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(zoneNotLongEnough, "zoneNotLongEnough", "src/yup_schemas/zone-schemas.js");
  reactHotLoader.register(zoneTooLong, "zoneTooLong", "src/yup_schemas/zone-schemas.js");
  reactHotLoader.register(zoneDescriptionNotLongEnough, "zoneDescriptionNotLongEnough", "src/yup_schemas/zone-schemas.js");
  reactHotLoader.register(zoneDescriptionTooLong, "zoneDescriptionTooLong", "src/yup_schemas/zone-schemas.js");
  reactHotLoader.register(zoneCreateSchema, "zoneCreateSchema", "src/yup_schemas/zone-schemas.js");
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

  reactHotLoader.register(zoneNotLongEnough, "zoneNotLongEnough", "src/yup_schemas/zone-schemas.js");
  reactHotLoader.register(zoneTooLong, "zoneTooLong", "src/yup_schemas/zone-schemas.js");
  reactHotLoader.register(zoneDescriptionNotLongEnough, "zoneDescriptionNotLongEnough", "src/yup_schemas/zone-schemas.js");
  reactHotLoader.register(zoneDescriptionTooLong, "zoneDescriptionTooLong", "src/yup_schemas/zone-schemas.js");
  reactHotLoader.register(zoneCreateSchema, "zoneCreateSchema", "src/yup_schemas/zone-schemas.js");
  leaveModule(module);
})();

;