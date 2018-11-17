"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _userCtrl = require("./user-ctrl");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get("/confirm/:id", _userCtrl.confirmationEmail);
router.get("/change-password/:id", _userCtrl.forgotPasswordEmail);

exports.default = router;