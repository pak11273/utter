import {ApolloServer} from "apollo-server-express"
import {importSchema} from "graphql-import"
import {makeExecutableSchema} from "graphql-tools"
import merge from "lodash/merge"
import path from "path"
import {redis} from "./redis"

// schema imports
const userTypeDefs = importSchema(
  path.join(__dirname, "./api/user/user.graphql")
)

// resolver imports
import {userResolvers} from "./api/user/user-resolvers.js"

// baseSchema minimum requirement is a property query: Query
const baseSchema = `
  schema {
    query: Query,
    mutation: Mutation
  }
`
const schema = makeExecutableSchema({
  typeDefs: [baseSchema, userTypeDefs],
  resolvers: merge({}, userResolvers)
})

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
