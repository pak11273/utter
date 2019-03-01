import {makeExecutableSchema} from "apollo-server"
import path from "path"
import fs from "fs"

// schema imports
const userSchema = path.join(__dirname, "./api/user/user.graphql")
const courseSchema = path.join(__dirname, "./api/course/course.graphql")

const userTypeDefs = fs.readFileSync(userSchema, "utf8")
const courseTypeDefs = fs.readFileSync(courseSchema, "utf8")

// import userTypeDefs from "./api/user/user.graphql"
// import courseTypeDefs from "./api/course/course.graphql"

// resolver imports
import {userResolvers} from "./api/user/user.resolvers.js"
import {courseResolvers} from "./api/course/course-resolvers.js"
import {merge} from "lodash"
import {graphqlExpress} from "apollo-server-express"

// baseSchema minimum requirement is a property query: Query
const baseSchema = `
  schema {
    query: Query,
    mutation: Mutation
  }
`
const schema = makeExecutableSchema({
  typeDefs: [baseSchema, userTypeDefs, courseTypeDefs],
  resolvers: merge({}, userResolvers, courseResolvers)
})

/* 
 * graphqlExpress will send the req object to all of our resolvers through the context object!
 */
export const graphQLRouter = graphqlExpress(req => ({
  schema,
  context: {
    req,
    user: req.user
  }
}))
