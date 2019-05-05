"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _postCtrl = _interopRequireDefault(require("./post-ctrl.js"));

var _createRoutes = _interopRequireDefault(require("../../utils/create-routes.js"));

var router = _express.default.Router();

router.route("/faker").get(_postCtrl.default.faker);
(0, _createRoutes.default)(_postCtrl.default, router);
router.route("/my-posts/:postAuthorId").get(_postCtrl.default.getTeachingPosts);
router.route("/unique").post(_postCtrl.default.unique);
router.route("/:authId/:postAuthorId/:postId/:postName").get(_postCtrl.default.getOne).delete(_postCtrl.default.deletePost).put(_postCtrl.default.updateOne);
router.route("/my-posts/:postAuthorId/:postId/:postName/:postId").delete(_postCtrl.default.deletePost);
var _default = router;
exports.default = _default;