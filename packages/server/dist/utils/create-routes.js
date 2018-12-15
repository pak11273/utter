'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _auth = require('../auth');

var checkUser = [(0, _auth.decodeToken)(), (0, _auth.getFreshUser)()];

exports.default = function (controller, router) {
  router.param('id', controller.findByParams);

  router.route('/').get(controller.get).post(controller.createOne);

  router.route('/:id').get(controller.getOne).put(controller.updateOne).delete(controller.remove);
};