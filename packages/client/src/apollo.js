import {ApolloClient} from "apollo-client"
import {ApolloLink, Observable} from "apollo-link"
import {InMemoryCache} from "apollo-cache-inmemory"
import {onError} from "apollo-link-error"
import {withClientState} from "apollo-link-state"
import {HttpLink} from "apollo-link-http"

console.log("react_server_url: ", process.env)
const logoutUser = () => {
  localStorage.removeItem("AUTH_TOKEN")
}

const request = async operation => {
  const token = await localStorage.getItem("AUTH_TOKEN")
  operation.setContext({
    headers: {
      authorization: token
    }
  })
}

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable(observer => {
      let handle
      Promise.resolve(operation)
        .then(oper => request(oper))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer)
          })
        })
        .catch(observer.error.bind(observer))

      return () => {
        if (handle) handle.unsubscribe()
      }
    })
)

export default new ApolloClient({
  link: ApolloLink.from([
    onError(({graphQLErrors, networkError}) => {
      if (graphQLErrors) {
        return graphQLErrors
      }
      if (networkError) {
        logoutUser()
      }
    }),
    requestLink,
    withClientState({
      defaults: {
        isConnected: true
      },
      resolvers: {
        Mutation: {
          updateNetworkStatus: (_, {isConnected}, {cache}) => {
            cache.writeData({data: {isConnected}})
            return null
          }
        }
      }
    }),
    new HttpLink({
      uri:
        process.env.NODE_ENV === "production" || process.env.NODE_ENV === "prod"
          ? process.env.REACT_APP_SERVER_URL
          : "/graphql",
      credentials: "include"
    })
  ]),
  cache: new InMemoryCache()
})
