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

var _userRoutes = require("./user/user-routes.js");

var _userRoutes2 = _interopRequireDefault(_userRoutes);

var _courseRoutes = require("./course/course-routes.js");

var _courseRoutes2 = _interopRequireDefault(_courseRoutes);

var _levelRoutes = require("./level/level-routes.js");

var _levelRoutes2 = _interopRequireDefault(_levelRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express2.default)();

router.use("/users", _userRoutes2.default);
router.use("/courses", _courseRoutes2.default);
router.use("/levels", _levelRoutes2.default);
router.use("/test", function () {
  return "whatever dude";
});

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

  reactHotLoader.register(router, "router", "src/api/index.js");
  reactHotLoader.register(_default, "default", "src/api/index.js");
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

  reactHotLoader.register(router, "router", "src/api/index.js");
  reactHotLoader.register(_default2, "default", "src/api/index.js");
  leaveModule(module);
})();

;