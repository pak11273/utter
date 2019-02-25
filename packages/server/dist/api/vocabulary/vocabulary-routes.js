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

var _levelCtrl = require("./level-ctrl.js");

var _levelCtrl2 = _interopRequireDefault(_levelCtrl);

var _createRoutes = require("../../utils/create-routes.js");

var _createRoutes2 = _interopRequireDefault(_createRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();


router.route("/faker").get(_levelCtrl2.default.faker);

(0, _createRoutes2.default)(_levelCtrl2.default, router);

// get teaching vocabulary
router.route("/my-vocabulary/:levelAuthorId").get(_levelCtrl2.default.getTeachingVocabulary);

// custom routes
router.route("/unique").post(_levelCtrl2.default.unique);

// get current teaching level
router.route("/:authId/:levelAuthorId/:levelId/:levelName").get(_levelCtrl2.default.getOne).delete(_levelCtrl2.default.deleteVocabulary).put(_levelCtrl2.default.updateOne);

// delete level level
router.route("/my-vocabulary/:levelAuthorId/:levelId/:levelName/:levelId").delete(_levelCtrl2.default.deleteVocabulary);

// .put(controller.update)

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

  reactHotLoader.register(router, "router", "src/api/vocabulary/vocabulary-routes.js");
  reactHotLoader.register(_default, "default", "src/api/vocabulary/vocabulary-routes.js");
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

  reactHotLoader.register(router, "router", "src/api/vocabulary/vocabulary-routes.js");
  reactHotLoader.register(_default2, "default", "src/api/vocabulary/vocabulary-routes.js");
  leaveModule(module);
})();

;