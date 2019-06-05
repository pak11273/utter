"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _userRoutes = _interopRequireDefault(require("./user/user-routes.js"));

var _courseRoutes = _interopRequireDefault(require("./course/course-routes.js"));

var _zoneRoutes = _interopRequireDefault(require("./zone/zone-routes.js"));

var _levelRoutes = _interopRequireDefault(require("./level/level-routes.js"));

var router = (0, _express["default"])();
router.use("/users", _userRoutes["default"]);
router.use("/courses", _courseRoutes["default"]);
router.use("/levels", _levelRoutes["default"]);
router.use("/zones", _zoneRoutes["default"]);
var _default = router;
exports["default"] = _default;