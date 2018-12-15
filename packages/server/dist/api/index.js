"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _userRoutes = require("./user/user-routes.js");

var _userRoutes2 = _interopRequireDefault(_userRoutes);

var _courseRoutes = require("./course/course-routes.js");

var _courseRoutes2 = _interopRequireDefault(_courseRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express2.default)();

router.use("/users", _userRoutes2.default);
router.use("/courses", _courseRoutes2.default);
router.use("/test", function () {
  return "whatever dude";
});

exports.default = router;