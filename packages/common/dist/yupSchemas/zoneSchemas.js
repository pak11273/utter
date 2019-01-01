"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zoneCreateSchema = exports.zoneTooLong = exports.zoneDescriptionTooLong = exports.zoneDescriptionNotLongEnough = exports.zoneNotLongEnough = undefined;

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

/* const invalidLogin = "invalid login" */

/* export const invalidEmail = "email must be a valid email" */
var zoneNotLongEnough = exports.zoneNotLongEnough = "Zone name must be at least 10 characters";
var zoneDescriptionNotLongEnough = exports.zoneDescriptionNotLongEnough = "Zone description must be at least 100 characters";
var zoneDescriptionTooLong = exports.zoneDescriptionTooLong = "Zone description cannot exceed 350 characters";
var zoneTooLong = exports.zoneTooLong = "Zone name cannot exceed 100 characters";

var zoneCreateSchema = exports.zoneCreateSchema = yup.object().shape({
  zoneName: yup.string().min(10, zoneNotLongEnough).max(100, zoneTooLong).required("A zone name is required"),
  zoneDescription: yup.string().min(100, zoneDescriptionNotLongEnough).max(350, zoneDescriptionTooLong).required("A zone description is required")
});
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(zoneNotLongEnough, "zoneNotLongEnough", "src/yupSchemas/zoneSchemas.js");
  reactHotLoader.register(zoneDescriptionNotLongEnough, "zoneDescriptionNotLongEnough", "src/yupSchemas/zoneSchemas.js");
  reactHotLoader.register(zoneDescriptionTooLong, "zoneDescriptionTooLong", "src/yupSchemas/zoneSchemas.js");
  reactHotLoader.register(zoneTooLong, "zoneTooLong", "src/yupSchemas/zoneSchemas.js");
  reactHotLoader.register(zoneCreateSchema, "zoneCreateSchema", "src/yupSchemas/zoneSchemas.js");
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

  reactHotLoader.register(zoneNotLongEnough, "zoneNotLongEnough", "src/yupSchemas/zoneSchemas.js");
  reactHotLoader.register(zoneDescriptionNotLongEnough, "zoneDescriptionNotLongEnough", "src/yupSchemas/zoneSchemas.js");
  reactHotLoader.register(zoneDescriptionTooLong, "zoneDescriptionTooLong", "src/yupSchemas/zoneSchemas.js");
  reactHotLoader.register(zoneTooLong, "zoneTooLong", "src/yupSchemas/zoneSchemas.js");
  reactHotLoader.register(zoneCreateSchema, "zoneCreateSchema", "src/yupSchemas/zoneSchemas.js");
  leaveModule(module);
})();

;