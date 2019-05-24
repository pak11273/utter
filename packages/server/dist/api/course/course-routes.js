"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _courseCtrl = _interopRequireDefault(require("./course-ctrl.js"));

var router = _express.default.Router();

router.route("/faker").get(_courseCtrl.default.faker);
var _default = router;
exports.default = _default;