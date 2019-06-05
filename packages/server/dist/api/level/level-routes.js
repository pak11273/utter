"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _levelCtrl = _interopRequireDefault(require("./level-ctrl.js"));

var _createRoutes = _interopRequireDefault(require("../../utils/create-routes.js"));

var router = _express["default"].Router();

router.route("/faker").get(_levelCtrl["default"].faker);
(0, _createRoutes["default"])(_levelCtrl["default"], router);
router.route("/my-levels/:levelAuthorId").get(_levelCtrl["default"].getTeachingLevels);
router.route("/unique").post(_levelCtrl["default"].unique);
router.route("/:authId/:levelAuthorId/:levelId/:levelName").get(_levelCtrl["default"].getOne)["delete"](_levelCtrl["default"].deleteLevel).put(_levelCtrl["default"].updateOne);
router.route("/my-levels/:levelAuthorId/:levelId/:levelName/:levelId")["delete"](_levelCtrl["default"].deleteLevel);
var _default = router;
exports["default"] = _default;