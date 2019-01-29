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

var _mailCtrl = require("./mail-ctrl.js");

var _mailCtrl2 = _interopRequireDefault(_mailCtrl);

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// cors preflight
router.all("*", (0, _cors2.default)());

// contact mail
router.post("/contactmail", _mailCtrl2.default.contactmail);

// forgot password
/* router.post("/forgot-password", controller.forgotPassword) */
/* router.post("/reset-password", controller.resetPassword) */

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

  reactHotLoader.register(router, "router", "src/mail/mail-routes.js");
  reactHotLoader.register(_default, "default", "src/mail/mail-routes.js");
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

  reactHotLoader.register(router, "router", "src/mail/mail-routes.js");
  reactHotLoader.register(_default2, "default", "src/mail/mail-routes.js");
  leaveModule(module);
})();

;