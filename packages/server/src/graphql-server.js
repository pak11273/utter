import {ApolloServer} from "apollo-server-express"
import {importSchema} from "graphql-import"
import {makeExecutableSchema} from "apollo-server"
import merge from "lodash/merge"
import mongoose from "mongoose"
import fs from "fs"
import path from "path"
import {redis} from "./redis"
import {restDirective} from "./directives/rest.js"

// directive imports
import {DeprecatedDirective} from "./directives/deprecated/deprecated.js"
import {FormattableDateDirective} from "./directives/formattableDate.js"
import {AuthDirective} from "./directives/auth/auth-directive.js"
import {hasRightsDirective} from "./directives/auth/auth-has-rights.js"

// schema imports
const appSchema = path.join(__dirname, "./api/app/app.graphql")
const courseSchema = path.join(__dirname, "./api/course/course.graphql")
const levelSchema = path.join(__dirname, "./api/level/level.graphql")
const postSchema = path.join(__dirname, "./api/post/post.graphql")
const sharedSchema = path.join(__dirname, "./api/shared/shared.graphql")
const termSchema = path.join(__dirname, "./api/term/term.graphql")
const testSchema = path.join(__dirname, "./api/test/test.graphql")
const userSchema = path.join(__dirname, "./api/user/user.graphql")
const vocabularySchema = path.join(
  __dirname,
  "./api/vocabulary/vocabulary.graphql"
)
const zoneSchema = path.join(__dirname, "./api/zone/zone.graphql")

// type defs
const appTypeDefs = fs.readFileSync(appSchema, "utf8")
const courseTypeDefs = fs.readFileSync(courseSchema, "utf8")
const levelTypeDefs = fs.readFileSync(levelSchema, "utf8")
const postTypeDefs = fs.readFileSync(postSchema, "utf8")
const sharedTypeDefs = fs.readFileSync(sharedSchema, "utf8")
const termTypeDefs = fs.readFileSync(termSchema, "utf8")
const testTypeDefs = fs.readFileSync(testSchema, "utf8")
const userTypeDefs = fs.readFileSync(userSchema, "utf8")
const vocabularyTypeDefs = fs.readFileSync(vocabularySchema, "utf8")
const zoneTypeDefs = fs.readFileSync(zoneSchema, "utf8")

// resolver imports
import {appResolvers} from "./api/app/app-resolvers.js"
import {courseResolvers} from "./api/course/course-resolvers.js"
import {levelResolvers} from "./api/level/level-resolvers.js"
import {postResolvers} from "./api/post/post-resolvers.js"
import {termResolvers} from "./api/term/term-resolvers.js"
import {testResolvers} from "./api/test/test-resolvers.js"
import {userResolvers} from "./api/user/user-resolvers.js"
import {vocabularyResolvers} from "./api/vocabulary/vocabulary-resolvers.js"
import {zoneResolvers} from "./api/zone/zone-resolvers.js"

// baseSchema minimum requirement is a property query: Query
const baseSchema = `
  schema {
    query: Query,
    mutation: Mutation
  }
`
const schema = makeExecutableSchema({
  typeDefs: [
    baseSchema,
    userTypeDefs,
    courseTypeDefs,
    levelTypeDefs,
    postTypeDefs,
    sharedTypeDefs,
    termTypeDefs,
    testTypeDefs,
    vocabularyTypeDefs,
    zoneTypeDefs
  ],
  schemaDirectives: {
    formattableDate: FormattableDateDirective,
    deprecated: DeprecatedDirective,
    auth: AuthDirective,
    hasRights: hasRightsDirective
  },
  resolvers: merge(
    {},
    userResolvers,
    courseResolvers,
    levelResolvers,
    postResolvers,
    termResolvers,
    testResolvers,
    vocabularyResolvers,
    zoneResolvers
  )
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
  credentials: true,
  playground:
    process.env.NODE_ENV === "production" || process.env.NODE_ENV === "prod"
      ? false
      : true,

  /* schema: schemaWithMiddleware, // see TODO */
  schema,
  context: ({req, res}) => ({
    redis,
    url:
      process.env.NODE_ENV === "production" || process.env.NODE_ENV === "prod"
        ? "https://" + process.env.SERVER_URL
        : req.protocol + "://" + req.get("host"),
    req,
    isAuth: req.isAuth
  })
})
