import {ApolloClient} from "apollo-client"
import {ApolloLink} from "apollo-link"
import {InMemoryCache} from "apollo-cache-inmemory"
import {createPersistedQueryLink} from "apollo-link-persisted-queries"
import {HttpLink} from "apollo-link-http"
import {cookies} from "brownies"
import {userTypeDefs} from "./api/user/user-types.js"
import {userResolvers} from "./api/user/user-resolvers.js"

const cache = new InMemoryCache({
  /* addTypename: false, */
  dataIdFromObject: object => object.key || null
})

const AuthLink = (operation, forward) => {
  const token = cookies._uid
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
      ? /* ? process.env.APP_URL */
        "https://api.utterzone.com/graphql"
      : "/graphql",
  credentials: "include"
})

const persistLink = createPersistedQueryLink()

export const ApolloInstance = new ApolloClient({
  cache,
  link: ApolloLink.from([AuthLink, persistLink, httpLink]),
  userResolvers,
  userTypeDefs
})

cache.writeData({
  data: {
    isLoggedIn: !!cookies._uid
  }
})


