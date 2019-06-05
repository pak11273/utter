"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _auth = require("../auth");

var checkUser = [(0, _auth.decodeToken)(), (0, _auth.getFreshUser)()];

var _default = function _default(controller, router) {
  router.param('id', controller.findByParams);
  router.route("/").get(controller.get).post(controller.createOne);
  router.route("/:id").get(controller.getOne).put(controller.updateOne)["delete"](controller.remove);
};

exports["default"] = _default;