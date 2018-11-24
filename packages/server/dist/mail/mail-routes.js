"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

exports.default = router;