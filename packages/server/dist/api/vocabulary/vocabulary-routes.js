"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _levelCtrl = _interopRequireDefault(require("./level-ctrl.js"));

var _createRoutes = _interopRequireDefault(require("../../utils/create-routes.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

router.route("/faker").get(_levelCtrl.default.faker);
(0, _createRoutes.default)(_levelCtrl.default, router); // get teaching vocabulary

router.route("/my-vocabulary/:levelAuthorId").get(_levelCtrl.default.getTeachingVocabulary); // custom routes

router.route("/unique").post(_levelCtrl.default.unique); // get current teaching level

router.route("/:authId/:levelAuthorId/:levelId/:levelName").get(_levelCtrl.default.getOne).delete(_levelCtrl.default.deleteVocabulary).put(_levelCtrl.default.updateOne); // delete level level

router.route("/my-vocabulary/:levelAuthorId/:levelId/:levelName/:levelId").delete(_levelCtrl.default.deleteVocabulary); // .put(controller.update)

var _default = router;
exports.default = _default;