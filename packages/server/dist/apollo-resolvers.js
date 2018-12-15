"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _apolloErrors = require("apollo-errors");

var _apolloResolvers = require("apollo-resolvers");

var _graphqlErrors = require("./errors/graphql-errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* import schema from "./schema.graphql" */

var baseResolver = (0, _apolloResolvers.createResolver)(null, function (root, args, ctx, err) {
  if ((0, _apolloErrors.isInstance)(err)) {
    return err;
  }
  return new _graphqlErrors.unkownError({
    data: {
      name: err.name
    }
  });
}); // ref: https://www.youtube.com/watch?v=xaorvBjCE7A
// ref: https://github.com/thebigredgeek/apollo-resolvers
// TODO: not sure if I'm going to implement this

var authenticationResolver = baseResolver.createResolver(function (root, args, ctx) {
  var user = ctx.user;

  if (!user) throw new _graphqlErrors.authorizationError();
});

var alreadyAuthentictedResolver = baseResolver.createResolver(function (root, args, ctx) {
  var user = ctx.user;

  if (!user) throw new _graphqlErrors.alreadyAuthentictedError();
});

var isAdminResolver = authenticationResolver.createResolver(function (root, args, ctx) {
  var user = ctx.user;


  if (!user.isAdmin) throw new _graphqlErrors.forbiddenError();
});

// functional resolvers

var getMyUser = authenticationResolver.createResolver(function (root, args, ctx) {
  var user = ctx.user;

  return user;
});

var signup = alreadyAuthentictedResolver.createResolver(function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(root, args, ctx) {
    var userModel, username, email, password, user;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            userModel = ctx.models.userModel;
            username = args.username, email = args.email, password = args.password;
            _context.next = 4;
            return userModel.signup({
              username: username,
              email: email,
              password: password
            });

          case 4:
            user = _context.sent;

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());

var login = alreadyAuthentictedResolver.createResolver(function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(root, args, ctx) {
    var userModel, identity, password, user;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            userModel = ctx.models.userModel;
            identity = args.identity, password = args.password;
            _context2.next = 4;
            return userModel.login({
              identtiy: identtiy,
              password: password
            });

          case 4:
            user = _context2.sent;

            ctx.user = user;
            return _context2.abrupt("return", user);

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}());

var updateProfile = alreadyAuthentictedResolver.createResolver(function (root, args, ctx) {
  var user = ctx.user,
      userModel = ctx.models.userModel;
  var username = args.username,
      email = args.email;


  return userModel.update({
    username: username,
    email: email
  });
});

var banUser = isAdminResolver.createResolver(function (root, args, ctx) {
  var userModel = ctx.models.userModel;
  var id = args.id;

  return userModel.ban(id);
});

// Schema creation

var typeDefs = { schema: schema };

var resolvers = {
  Query: {
    getMyUser: getMyUser
  },

  Mutation: {
    signup: signup,
    updateProfile: updateProfile,
    banUser: banUser
  }
};

exports.default = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers
});