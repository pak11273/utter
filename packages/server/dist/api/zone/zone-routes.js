"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _zoneCtrl = _interopRequireDefault(require("./zone-ctrl.js"));

var _createRoutes = _interopRequireDefault(require("../../utils/create-routes.js"));

var router = _express.default.Router();

router.route("/faker").get(_zoneCtrl.default.faker);
var _default = router;
exports.default = _default;