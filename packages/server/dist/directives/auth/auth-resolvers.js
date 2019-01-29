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

var auth = exports.auth = function auth(next, source, args, ctx) {
  var token = ctx.headers.authorization;
  if (!token) {
    throw new AuthorizationError({
      message: "You must supply a JWT for authorization!"
    });
  }
  try {
    var decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    ctx.user = decoded;
    return next();
  } catch (err) {
    throw new AuthorizationError({
      message: "You are not authorized."
    });
  }
};
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(auth, "auth", "src/directives/auth/auth-resolvers.js");
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

  reactHotLoader.register(auth, "auth", "src/directives/auth/auth-resolvers.js");
  leaveModule(module);
})();

;