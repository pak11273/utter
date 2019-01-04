"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _apolloServerExpress = require("apollo-server-express");

var _graphqlImport = require("graphql-import");

var _graphqlTools = require("graphql-tools");

var _merge = require("lodash/merge");

var _merge2 = _interopRequireDefault(_merge);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _deprecated = require("./directives/deprecated/deprecated.js");

var _formattableDate = require("./directives/formattableDate.js");

var _authDirective = require("./directives/auth/auth-directive");

var _redis = require("./redis");

var _rest = require("./directives/rest.js");

var _appResolvers = require("./api/app/app-resolvers.js");

var _courseResolvers = require("./api/course/course-resolvers.js");

var _levelResolvers = require("./api/level/level-resolvers.js");

var _termResolvers = require("./api/term/term-resolvers.js");

var _testResolvers = require("./api/test/test-resolvers.js");

var _userResolvers = require("./api/user/user-resolvers.js");

var _zoneResolvers = require("./api/zone/zone-resolvers.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* import { userLoader } from './loaders/userLoader'; */

// schema imports
var appSchema = _path2.default.join(__dirname, "./api/app/app.graphql");
var courseSchema = _path2.default.join(__dirname, "./api/course/course.graphql");
var levelSchema = _path2.default.join(__dirname, "./api/level/level.graphql");
var termSchema = _path2.default.join(__dirname, "./api/term/term.graphql");
var testSchema = _path2.default.join(__dirname, "./api/test/test.graphql");
var userSchema = _path2.default.join(__dirname, "./api/user/user.graphql");
var zoneSchema = _path2.default.join(__dirname, "./api/zone/zone.graphql");

// type defs
var appTypeDefs = _fs2.default.readFileSync(appSchema, "utf8");
var courseTypeDefs = _fs2.default.readFileSync(courseSchema, "utf8");
var levelTypeDefs = _fs2.default.readFileSync(levelSchema, "utf8");
var termTypeDefs = _fs2.default.readFileSync(termSchema, "utf8");
var testTypeDefs = _fs2.default.readFileSync(testSchema, "utf8");
var userTypeDefs = _fs2.default.readFileSync(userSchema, "utf8");
var zoneTypeDefs = _fs2.default.readFileSync(zoneSchema, "utf8");

// resolver imports


// baseSchema minimum requirement is a property query: Query
var baseSchema = "\n  schema {\n    query: Query,\n    mutation: Mutation\n  }\n";
var schema = (0, _graphqlTools.makeExecutableSchema)({
  schemaDirectives: {
    formattableDate: _formattableDate.FormattableDateDirective,
    deprecated: _deprecated.DeprecatedDirective,
    auth: _authDirective.isAuthenticatedDirective
  },
  typeDefs: [baseSchema, userTypeDefs, courseTypeDefs, levelTypeDefs, termTypeDefs, testTypeDefs, zoneTypeDefs],
  resolvers: (0, _merge2.default)({}, _userResolvers.userResolvers, _courseResolvers.courseResolvers, _levelResolvers.levelResolvers, _termResolvers.termResolvers, _testResolvers.testResolvers, _zoneResolvers.zoneResolvers)
});

// reference: https://gist.github.com/donedgardo/ed2d36f6e650991543e5a55c77cddc0d
// TODO: if apollo-server2 integrates with graphql-shield then check following line:
/* const schemaWithMiddleware = applyMiddleware(schema, permissions) */

var ObjectId = _mongoose2.default.Types.ObjectId;

ObjectId.prototype.valueOf = function () {
  return this.toString();
};

/*
 * graphqlExpress will send the req object to all of our resolvers through the context object!
 */

exports.default = new _apolloServerExpress.ApolloServer({
  introspection: true,
  playground: process.env.NODE_ENV === "production" || process.env.NODE_ENV === "prod" ? false : true,

  /* schema: schemaWithMiddleware, // see TODO */
  schema: schema,
  context: function context(_ref) {
    var req = _ref.req,
        res = _ref.res;
    return {
      redis: _redis.redis,
      url: process.env.NODE_ENV === "production" || process.env.NODE_ENV === "prod" ? "https://" + process.env.SERVER_URL : req.protocol + "://" + req.get("host"),
      req: req,
      user: req.user
      /* userLoader: userLoader() */
    };
  }
});