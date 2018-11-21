"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _apolloServerExpress = require("apollo-server-express");

var _graphqlImport = require("graphql-import");

var _graphqlTools = require("graphql-tools");

var _merge = require("lodash/merge");

var _merge2 = _interopRequireDefault(_merge);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _redis = require("./redis");

var _userResolvers = require("./api/user/user-resolvers.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// schema imports
var userTypeDefs = (0, _graphqlImport.importSchema)(_path2.default.join(__dirname, "./api/user/user.graphql"));

// resolver imports


// baseSchema minimum requirement is a property query: Query
var baseSchema = "\n  schema {\n    query: Query,\n    mutation: Mutation\n  }\n";
var schema = (0, _graphqlTools.makeExecutableSchema)({
  typeDefs: [baseSchema, userTypeDefs],
  resolvers: (0, _merge2.default)({}, _userResolvers.userResolvers)
});

/*
 * graphqlExpress will send the req object to all of our resolvers through the context object!
 */

exports.default = new _apolloServerExpress.ApolloServer({
  introspection: true,
  playground: true,
  schema: schema,
  context: function context(_ref) {
    var req = _ref.req,
        res = _ref.res;
    return {
      redis: _redis.redis,
      url: process.env.NODE_ENV === "production" || process.env.NODE_ENV === "prod" ? process.env.APP_URL : req.protocol + "://" + req.get("host"),
      req: req,
      user: req.user
    };
  }
});