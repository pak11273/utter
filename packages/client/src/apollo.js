import {ApolloClient} from "apollo-client"
import {ApolloLink} from "apollo-link"
import {InMemoryCache} from "apollo-cache-inmemory"
import {createPersistedQueryLink} from "apollo-link-persisted-queries"
import {HttpLink} from "apollo-link-http"
import {local} from "brownies"
import typeDefs from "./typeDefs.js"
import resolvers from "./resolvers.js"

const cache = new InMemoryCache({
  dataIdFromObject: object => object.key || null,
  addTypename: false
})

const AuthLink = (operation, forward) => {
  const token = local.AUTH_TOKEN
  operation.setContext(context => ({
    ...context,
    headers: {
      ...context.headers,
      authorization: token
    }
  }))

  return forward(operation)
}

const httpLink = new HttpLink({
  uri:
    process.env.NODE_ENV === "production" || process.env.NODE_ENV === "prod"
      ? /* ? process.env.REACT_APP_SERVER_URL */
        "https://api.utterzone.com/graphql"
      : "/graphql"
})

const persistLink = createPersistedQueryLink()

export default new ApolloClient({
  cache,
  link: ApolloLink.from([AuthLink, persistLink, httpLink]),
  resolvers,
  typeDefs
})

cache.writeData({
  data: {
    isLoggedIn: !!local.AUTH_TOKEN
  }
})
