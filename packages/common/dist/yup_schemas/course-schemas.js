"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.courseSchema = exports.courseCreateSchema = exports.nameTooLong = exports.descriptionTooLong = exports.descriptionNotLongEnough = exports.nameNotLongEnough = undefined;

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
var nameNotLongEnough = exports.nameNotLongEnough = "Course name must be at least 10 characters";
var descriptionNotLongEnough = exports.descriptionNotLongEnough = "Course description must be at least 100 characters";
var descriptionTooLong = exports.descriptionTooLong = "Course description cannot exceed 350 characters";
var nameTooLong = exports.nameTooLong = "Course name cannot exceed 100 characters";

var courseCreateSchema = exports.courseCreateSchema = yup.object().shape({
  courseName: yup.string().min(10, nameNotLongEnough).max(100, nameTooLong).required("A course name is required"),
  courseDescription: yup.string().min(100, descriptionNotLongEnough).max(350, descriptionTooLong).required("A course description is required")
});

var courseSchema = exports.courseSchema = yup.object().shape({
  courseName: yup.string().required("A course name is required").min(10, nameNotLongEnough).max(100, nameTooLong),
  courseDescription: yup.string().min(100, descriptionNotLongEnough).max(350, descriptionTooLong).required("A course description is required")
});
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(nameNotLongEnough, "nameNotLongEnough", "src/yup_schemas/course-schemas.js");
  reactHotLoader.register(descriptionNotLongEnough, "descriptionNotLongEnough", "src/yup_schemas/course-schemas.js");
  reactHotLoader.register(descriptionTooLong, "descriptionTooLong", "src/yup_schemas/course-schemas.js");
  reactHotLoader.register(nameTooLong, "nameTooLong", "src/yup_schemas/course-schemas.js");
  reactHotLoader.register(courseCreateSchema, "courseCreateSchema", "src/yup_schemas/course-schemas.js");
  reactHotLoader.register(courseSchema, "courseSchema", "src/yup_schemas/course-schemas.js");
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

  reactHotLoader.register(nameNotLongEnough, "nameNotLongEnough", "src/yup_schemas/course-schemas.js");
  reactHotLoader.register(descriptionNotLongEnough, "descriptionNotLongEnough", "src/yup_schemas/course-schemas.js");
  reactHotLoader.register(descriptionTooLong, "descriptionTooLong", "src/yup_schemas/course-schemas.js");
  reactHotLoader.register(nameTooLong, "nameTooLong", "src/yup_schemas/course-schemas.js");
  reactHotLoader.register(courseCreateSchema, "courseCreateSchema", "src/yup_schemas/course-schemas.js");
  reactHotLoader.register(courseSchema, "courseSchema", "src/yup_schemas/course-schemas.js");
  leaveModule(module);
})();

;