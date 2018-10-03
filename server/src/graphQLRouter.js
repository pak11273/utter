import {makeExecutableSchema} from 'graphql-tools'
import path from 'path'
import fs from 'fs'
const userSchema = path.join(__dirname, './api/user/user.graphql')
const courseSchema = path.join(__dirname, './api/course/course.graphql')
const userTypeDefs = fs.readFileSync(userSchema, 'utf8')
const courseTypeDefs = fs.readFileSync(courseSchema, 'utf8')
// const userTypeDefs = fs.readFile(userSchema, function(err, data) {
//   return data
// })
// const courseTypeDefs = fs.readFile(courseSchema, function(err, data) {
//   return data
// })

import {userResolvers} from './api/user/user.resolvers.js'
import {courseResolvers} from './api/course/course.resolvers.js'
import merge from 'lodash.merge'
import {graphqlExpress} from 'apollo-server-express'

const baseSchema = `
  schema {
    query: Query
  }
`

const schema = makeExecutableSchema({
  typeDefs: [baseSchema, userTypeDefs, courseTypeDefs],
  resolvers: merge({}, userResolvers, courseResolvers)
})

export const graphQLRouter = graphqlExpress(req => ({
  schema,
  context: {
    req,
    user: req.user
  }
}))
