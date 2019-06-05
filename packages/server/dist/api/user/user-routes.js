"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _userCtrl = require("./user-ctrl");

var router = _express["default"].Router();

router.get("/confirm/:id", _userCtrl.confirmationEmail);
router.get("/change-password/:id", _userCtrl.forgotPasswordEmail);
var _default = router;
exports["default"] = _default;