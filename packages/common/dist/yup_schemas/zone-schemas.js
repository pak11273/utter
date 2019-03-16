"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zoneCreateSchema = undefined;

var _yup = require("yup");

var yup = _interopRequireWildcard(_yup);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var zoneNotLongEnough = "Zone names must be at least 6 characters";
var zoneTooLong = "Zone names cannot exceed 20 characters";
var zoneDescriptionNotLongEnough = "Zone descriptions must be at least 30 characters";
var zoneDescriptionTooLong = "Zone descriptions cannot exceed 110 characters";

var zoneCreateSchema = exports.zoneCreateSchema = yup.object().shape({
  app: yup.string().required("An app is required"),
  course: yup.string().required("A course you subscribe to is required"),
  courseLevel: yup.string().required("A course level is required"),
  ageGroup: yup.string().required("Age restrictions are required"),
  zoneName: yup.string().min(3, zoneNotLongEnough).max(40, zoneTooLong).required("A zone name is required"),
  zoneDescription: yup.string().min(30, zoneDescriptionNotLongEnough).max(110, zoneDescriptionTooLong).required("A zone description is required")
});