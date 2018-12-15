"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
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