import {ApolloServer} from "apollo-server-express"
import {importSchema} from "graphql-import"
import mongoose from "mongoose"
import {makeExecutableSchema} from "graphql-tools"
import merge from "lodash/merge"
import fs from "fs"
import path from "path"
import {redis} from "./redis"

// directives
import {isAuthenticatedDirective} from "./directives/isAuthenticated.js"
import {DeprecatedDirective} from "./directives/deprecated.js"
import {hasScopeDirective} from "./directives/hasScope.js"

// schema imports
const userSchema = path.join(__dirname, "./api/user/user.graphql")
const courseSchema = path.join(__dirname, "./api/course/course.graphql")

// type defs
const userTypeDefs = fs.readFileSync(userSchema, "utf8")
const courseTypeDefs = fs.readFileSync(courseSchema, "utf8")

// resolver imports
import {userResolvers} from "./api/user/user-resolvers.js"
import {courseResolvers} from "./api/course/course-resolvers.js"

// baseSchema minimum requirement is a property query: Query
const baseSchema = `
  schema {
    query: Query,
    mutation: Mutation
  }
`
const schema = makeExecutableSchema({
  typeDefs: [baseSchema, userTypeDefs, courseTypeDefs],
  schemaDirectives: {
    auth: isAuthenticatedDirective,
    hasScope: hasScopeDirective,
    deprecated: DeprecatedDirective
  },
  resolvers: merge({}, userResolvers, courseResolvers)
})

const {ObjectId} = mongoose.Types
ObjectId.prototype.valueOf = function() {
  return this.toString()
}

/*
 * graphqlExpress will send the req object to all of our resolvers through the context object!
 */

export default new ApolloServer({
  introspection: true,
  playground: true,
  schema,
  context: ({req, res}) => ({
    redis,
    url:
      process.env.NODE_ENV === "production" || process.env.NODE_ENV === "prod"
        ? process.env.SERVER_URL
        : req.protocol + "://" + req.get("host"),
    req,
    user: req.user
  })
})
