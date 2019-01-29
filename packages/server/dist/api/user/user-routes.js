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

var _userCtrl = require("./user-ctrl");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get("/confirm/:id", _userCtrl.confirmationEmail);
router.get("/change-password/:id", _userCtrl.forgotPasswordEmail);

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

  reactHotLoader.register(router, "router", "src/api/user/user-routes.js");
  reactHotLoader.register(_default, "default", "src/api/user/user-routes.js");
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

  reactHotLoader.register(router, "router", "src/api/user/user-routes.js");
  reactHotLoader.register(_default2, "default", "src/api/user/user-routes.js");
  leaveModule(module);
})();

;