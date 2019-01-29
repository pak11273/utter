'use strict';

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

var _auth = require('../auth');

var checkUser = [(0, _auth.decodeToken)(), (0, _auth.getFreshUser)()];

var _default = function _default(controller, router) {
  router.param('id', controller.findByParams);

  router.route('/').get(controller.get).post(controller.createOne);

  router.route('/:id').get(controller.getOne).put(controller.updateOne).delete(controller.remove);
};

var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(checkUser, 'checkUser', 'src/utils/create-routes.js');
  reactHotLoader.register(_default, 'default', 'src/utils/create-routes.js');
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

  reactHotLoader.register(checkUser, 'checkUser', 'src/utils/create-routes.js');
  reactHotLoader.register(_default2, 'default', 'src/utils/create-routes.js');
  leaveModule(module);
})();

;