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

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _courseCtrl = require("./course-ctrl.js");

var _courseCtrl2 = _interopRequireDefault(_courseCtrl);

var _createRoutes = require("../../utils/create-routes.js");

var _createRoutes2 = _interopRequireDefault(_createRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();


router.route("/faker").get(_courseCtrl2.default.faker);

(0, _createRoutes2.default)(_courseCtrl2.default, router);

// get teaching courses
router.route("/my-courses/:courseAuthorId").get(_courseCtrl2.default.getTeachingCourses);

// custom routes
router.route("/unique").post(_courseCtrl2.default.unique);

// get current teaching course
router.route("/:authId/:courseAuthorId/:courseId/:courseName").get(_courseCtrl2.default.getOne).delete(_courseCtrl2.default.deleteCourse).put(_courseCtrl2.default.updateOne);

// delete course level
router.route("/my-courses/:courseAuthorId/:courseId/:courseName/:levelId").delete(_courseCtrl2.default.deleteLevel);

// .put(controller.update)

var _default = router;
var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(router, "router", "src/api/course/course-routes.js");
  reactHotLoader.register(_default, "default", "src/api/course/course-routes.js");
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

  reactHotLoader.register(router, "router", "src/api/course/course-routes.js");
  reactHotLoader.register(_default2, "default", "src/api/course/course-routes.js");
  leaveModule(module);
})();

;