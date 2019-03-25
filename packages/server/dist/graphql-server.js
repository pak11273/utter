"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apolloServerExpress = require("apollo-server-express");

var _graphqlImport = require("graphql-import");

var _apolloServer = require("apollo-server");

var _merge = _interopRequireDefault(require("lodash/merge"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

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

// directive imports
// schema imports
var appSchema = _path.default.join(__dirname, "./api/app/app.graphql");

var courseSchema = _path.default.join(__dirname, "./api/course/course.graphql");

var levelSchema = _path.default.join(__dirname, "./api/level/level.graphql");

var sharedSchema = _path.default.join(__dirname, "./api/shared/shared.graphql");

var termSchema = _path.default.join(__dirname, "./api/term/term.graphql");

var testSchema = _path.default.join(__dirname, "./api/test/test.graphql");

var userSchema = _path.default.join(__dirname, "./api/user/user.graphql");

var vocabularySchema = _path.default.join(__dirname, "./api/vocabulary/vocabulary.graphql");

var zoneSchema = _path.default.join(__dirname, "./api/zone/zone.graphql"); // type defs


var appTypeDefs = _fs.default.readFileSync(appSchema, "utf8");

var courseTypeDefs = _fs.default.readFileSync(courseSchema, "utf8");

var levelTypeDefs = _fs.default.readFileSync(levelSchema, "utf8");

var sharedTypeDefs = _fs.default.readFileSync(sharedSchema, "utf8");

var termTypeDefs = _fs.default.readFileSync(termSchema, "utf8");

var testTypeDefs = _fs.default.readFileSync(testSchema, "utf8");

var userTypeDefs = _fs.default.readFileSync(userSchema, "utf8");

var vocabularyTypeDefs = _fs.default.readFileSync(vocabularySchema, "utf8");

var zoneTypeDefs = _fs.default.readFileSync(zoneSchema, "utf8"); // resolver imports


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
  resolvers: (0, _merge.default)({}, _userResolvers.userResolvers, _courseResolvers.courseResolvers, _levelResolvers.levelResolvers, _termResolvers.termResolvers, _testResolvers.testResolvers, _vocabularyResolvers.vocabularyResolvers, _zoneResolvers.zoneResolvers)
});
var ObjectId = _mongoose.default.Types.ObjectId;

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

exports.default = _default;