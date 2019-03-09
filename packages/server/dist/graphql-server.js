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

var _apolloServerExpress = require("apollo-server-express");

var _graphqlImport = require("graphql-import");

var _apolloServer = require("apollo-server");

var _merge = require("lodash/merge");

var _merge2 = _interopRequireDefault(_merge);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _redis = require("./redis");

var _rest = require("./directives/rest.js");

var _deprecated = require("./directives/deprecated/deprecated.js");

var _formattableDate = require("./directives/formattableDate.js");

var _authDirective = require("./directives/auth/auth-directive.js");

var _authHasScope = require("./directives/auth/auth-has-scope.js");

var _appResolvers = require("./api/app/app-resolvers.js");

var _courseResolvers = require("./api/course/course-resolvers.js");

var _levelResolvers = require("./api/level/level-resolvers.js");

var _termResolvers = require("./api/term/term-resolvers.js");

var _testResolvers = require("./api/test/test-resolvers.js");

var _userResolvers = require("./api/user/user-resolvers.js");

var _vocabularyResolvers = require("./api/vocabulary/vocabulary-resolvers.js");

var _zoneResolvers = require("./api/zone/zone-resolvers.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// schema imports


// directive imports
var appSchema = _path2.default.join(__dirname, "./api/app/app.graphql");
var courseSchema = _path2.default.join(__dirname, "./api/course/course.graphql");
var levelSchema = _path2.default.join(__dirname, "./api/level/level.graphql");
var sharedSchema = _path2.default.join(__dirname, "./api/shared/shared.graphql");
var termSchema = _path2.default.join(__dirname, "./api/term/term.graphql");
var testSchema = _path2.default.join(__dirname, "./api/test/test.graphql");
var userSchema = _path2.default.join(__dirname, "./api/user/user.graphql");
var vocabularySchema = _path2.default.join(__dirname, "./api/vocabulary/vocabulary.graphql");
var zoneSchema = _path2.default.join(__dirname, "./api/zone/zone.graphql");

// type defs
var appTypeDefs = _fs2.default.readFileSync(appSchema, "utf8");
var courseTypeDefs = _fs2.default.readFileSync(courseSchema, "utf8");
var levelTypeDefs = _fs2.default.readFileSync(levelSchema, "utf8");
var sharedTypeDefs = _fs2.default.readFileSync(sharedSchema, "utf8");
var termTypeDefs = _fs2.default.readFileSync(termSchema, "utf8");
var testTypeDefs = _fs2.default.readFileSync(testSchema, "utf8");
var userTypeDefs = _fs2.default.readFileSync(userSchema, "utf8");
var vocabularyTypeDefs = _fs2.default.readFileSync(vocabularySchema, "utf8");
var zoneTypeDefs = _fs2.default.readFileSync(zoneSchema, "utf8");

// resolver imports


// baseSchema minimum requirement is a property query: Query
var baseSchema = "\n  schema {\n    query: Query,\n    mutation: Mutation\n  }\n";
var schema = (0, _apolloServer.makeExecutableSchema)({
  typeDefs: [baseSchema, userTypeDefs, courseTypeDefs, levelTypeDefs, sharedTypeDefs, termTypeDefs, testTypeDefs, vocabularyTypeDefs, zoneTypeDefs],
  schemaDirectives: {
    formattableDate: _formattableDate.FormattableDateDirective,
    deprecated: _deprecated.DeprecatedDirective,
    auth: _authDirective.AuthDirective,
    hasScope: _authHasScope.hasScopeDirective
  },
  resolvers: (0, _merge2.default)({}, _userResolvers.userResolvers, _courseResolvers.courseResolvers, _levelResolvers.levelResolvers, _termResolvers.termResolvers, _testResolvers.testResolvers, _vocabularyResolvers.vocabularyResolvers, _zoneResolvers.zoneResolvers)
});

var ObjectId = _mongoose2.default.Types.ObjectId;

ObjectId.prototype.valueOf = function () {
  return this.toString();
};

/*
 * graphqlExpress will send the req object to all of our resolvers through the context object!
 */

var _default = new _apolloServerExpress.ApolloServer({
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
      isAuth: req.isAuth
    };
  }
});

var _default2 = _default;
exports.default = _default2;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(appSchema, "appSchema", "src/graphql-server.js");
  reactHotLoader.register(courseSchema, "courseSchema", "src/graphql-server.js");
  reactHotLoader.register(levelSchema, "levelSchema", "src/graphql-server.js");
  reactHotLoader.register(sharedSchema, "sharedSchema", "src/graphql-server.js");
  reactHotLoader.register(termSchema, "termSchema", "src/graphql-server.js");
  reactHotLoader.register(testSchema, "testSchema", "src/graphql-server.js");
  reactHotLoader.register(userSchema, "userSchema", "src/graphql-server.js");
  reactHotLoader.register(vocabularySchema, "vocabularySchema", "src/graphql-server.js");
  reactHotLoader.register(zoneSchema, "zoneSchema", "src/graphql-server.js");
  reactHotLoader.register(appTypeDefs, "appTypeDefs", "src/graphql-server.js");
  reactHotLoader.register(courseTypeDefs, "courseTypeDefs", "src/graphql-server.js");
  reactHotLoader.register(levelTypeDefs, "levelTypeDefs", "src/graphql-server.js");
  reactHotLoader.register(sharedTypeDefs, "sharedTypeDefs", "src/graphql-server.js");
  reactHotLoader.register(termTypeDefs, "termTypeDefs", "src/graphql-server.js");
  reactHotLoader.register(testTypeDefs, "testTypeDefs", "src/graphql-server.js");
  reactHotLoader.register(userTypeDefs, "userTypeDefs", "src/graphql-server.js");
  reactHotLoader.register(vocabularyTypeDefs, "vocabularyTypeDefs", "src/graphql-server.js");
  reactHotLoader.register(zoneTypeDefs, "zoneTypeDefs", "src/graphql-server.js");
  reactHotLoader.register(baseSchema, "baseSchema", "src/graphql-server.js");
  reactHotLoader.register(schema, "schema", "src/graphql-server.js");
  reactHotLoader.register(ObjectId, "ObjectId", "src/graphql-server.js");
  reactHotLoader.register(_default, "default", "src/graphql-server.js");
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

  reactHotLoader.register(appSchema, "appSchema", "src/graphql-server.js");
  reactHotLoader.register(courseSchema, "courseSchema", "src/graphql-server.js");
  reactHotLoader.register(levelSchema, "levelSchema", "src/graphql-server.js");
  reactHotLoader.register(sharedSchema, "sharedSchema", "src/graphql-server.js");
  reactHotLoader.register(termSchema, "termSchema", "src/graphql-server.js");
  reactHotLoader.register(testSchema, "testSchema", "src/graphql-server.js");
  reactHotLoader.register(userSchema, "userSchema", "src/graphql-server.js");
  reactHotLoader.register(vocabularySchema, "vocabularySchema", "src/graphql-server.js");
  reactHotLoader.register(zoneSchema, "zoneSchema", "src/graphql-server.js");
  reactHotLoader.register(appTypeDefs, "appTypeDefs", "src/graphql-server.js");
  reactHotLoader.register(courseTypeDefs, "courseTypeDefs", "src/graphql-server.js");
  reactHotLoader.register(levelTypeDefs, "levelTypeDefs", "src/graphql-server.js");
  reactHotLoader.register(sharedTypeDefs, "sharedTypeDefs", "src/graphql-server.js");
  reactHotLoader.register(termTypeDefs, "termTypeDefs", "src/graphql-server.js");
  reactHotLoader.register(testTypeDefs, "testTypeDefs", "src/graphql-server.js");
  reactHotLoader.register(userTypeDefs, "userTypeDefs", "src/graphql-server.js");
  reactHotLoader.register(vocabularyTypeDefs, "vocabularyTypeDefs", "src/graphql-server.js");
  reactHotLoader.register(zoneTypeDefs, "zoneTypeDefs", "src/graphql-server.js");
  reactHotLoader.register(baseSchema, "baseSchema", "src/graphql-server.js");
  reactHotLoader.register(schema, "schema", "src/graphql-server.js");
  reactHotLoader.register(ObjectId, "ObjectId", "src/graphql-server.js");
  reactHotLoader.register(_default2, "default", "src/graphql-server.js");
  leaveModule(module);
})();

;