import {GraphQLServer} from 'graphql-yoga'
import {userResolvers} from '../api/user/user.resolvers.js'
import fs from 'fs'
import path from 'path'

const filePath = path.join(__dirname, '../api/user/user.graphql')
const typeDefs = fs.readFileSync(filePath, 'utf-8')
const resolvers = userResolvers

const serverOptions = {
  port: 4000,
  endpoint: '/graphql',
  playground: '/docs',
  tracing: true,
  debug: true
}

const server = new GraphQLServer({typeDefs, resolvers})

server.start(serverOptions, ({port}) =>
  console.log(`Server on port ${serverOptions.port}`)
)
