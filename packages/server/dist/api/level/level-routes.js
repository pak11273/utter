"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _levelCtrl = require("./level-ctrl.js");

var _levelCtrl2 = _interopRequireDefault(_levelCtrl);

var _createRoutes = require("../../utils/create-routes.js");

var _createRoutes2 = _interopRequireDefault(_createRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();


router.route("/faker").get(_levelCtrl2.default.faker);

(0, _createRoutes2.default)(_levelCtrl2.default, router);

// get teaching levels
router.route("/my-levels/:levelAuthorId").get(_levelCtrl2.default.getTeachingLevels);

// custom routes
router.route("/unique").post(_levelCtrl2.default.unique);

// get current teaching level
router.route("/:authId/:levelAuthorId/:levelId/:levelName").get(_levelCtrl2.default.getOne).delete(_levelCtrl2.default.deleteLevel).put(_levelCtrl2.default.updateOne);

// delete level level
router.route("/my-levels/:levelAuthorId/:levelId/:levelName/:levelId").delete(_levelCtrl2.default.deleteLevel);

// .put(controller.update)

exports.default = router;