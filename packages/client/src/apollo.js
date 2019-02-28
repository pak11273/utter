import {ApolloClient} from "apollo-client"
import {ApolloLink} from "apollo-link"
import {InMemoryCache} from "apollo-cache-inmemory"
import {withClientState} from "apollo-link-state"
import {createPersistedQueryLink} from "apollo-link-persisted-queries"
import {HttpLink} from "apollo-link-http"
import defaults from "./defaults.js"
import resolvers from "./resolvers.js"

const cache = new InMemoryCache({
  dataIdFromObject: object => object.key || null,
  addTypename: false
})

const stateLink = withClientState({
  cache,
  defaults,
  resolvers
})

const httpLink = new HttpLink({
  uri:
    process.env.NODE_ENV === "production" || process.env.NODE_ENV === "prod"
      ? /* ? process.env.REACT_APP_SERVER_URL */
        "https://api.utterzone.com/graphql"
      : "/graphql",
  headers: {
    authorization: localStorage.getItem("AUTH_TOKEN") || null
  }
})

const persistLink = createPersistedQueryLink()

export default new ApolloClient({
  cache,
  link: ApolloLink.from([stateLink, persistLink, httpLink])
})
