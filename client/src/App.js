import React, {Component} from "react"
import {Link, Switch, Route} from "react-router-dom"
import {render} from "react-dom"
import {Provider} from "react-redux"
import styled, {ThemeProvider} from "styled-components"
import jwt from "jsonwebtoken"
import {AppContainer} from "react-hot-loader"
import {ConnectedRouter as Router} from "react-router-redux"
import LoadingBar from "react-redux-loading-bar"
import ReactGA from "react-ga"

import {ApolloProvider} from "react-apollo"
import {ApolloClient} from "apollo-client"
import {InMemoryCache} from "apollo-cache-inmemory"
import {HttpLink} from "apollo-link-http"
import {setContext} from "apollo-link-context"
import {onError} from "apollo-link-error"
import {withClientState} from "apollo-link-state"
import {ApolloLink, Observable} from "apollo-link"
import gql from "graphql-tag"

import "./assets/css/global-styles.js"
import {routes} from "./routes"
import {main} from "./themes/config.js"
import {Footer, MainNavbar} from "./containers"
import {Grid, Section} from "./components"
import NavbarSpacer from "./components/Spacers/NavbarSpacer.js"
import {store, persistor} from "./store.js"
import FlashMessagesList from "./components/FlashMessages/FlashMessagesList"
import history from "./history.js"
import {PersistGate} from "redux-persist/integration/react"
import "semantic-ui-css/semantic.css"

const StyledGrid = styled(Grid)`
  display: grid;
  grid-template-rows: auto auto 1fr;
  grid-template-areas:
    "navBar"
    "flash"
    "content"
    "footer";
  margin: 0 auto;
`

var options = {
  target: document.getElementById("nanobar")
}

/**
 * * Checks authentication status on route change
 * * @param  {object}   nextState The state we want to change into when we change routes
 * * @param  {function} replace Function provided by React Router to replace the location
 * */

function checkAuth(nextState, replace) {
  const {loggedIn} = store.getState()

  store.dispatch(clearError())

  // Check if the path isn't dashboard. That way we can apply specific logic to
  // display/render the path we want to
  if (nextState.location.pathname !== "/dashboard") {
    if (loggedIn) {
      if (nextState.location.state && nextState.location.pathname) {
        replace(nextState.location.pathname)
      } else {
        replace("/")
      }
    }
  } else {
    // If the user is already logged in, forward them to the homepage
    if (!loggedIn) {
      if (nextState.location.state && nextState.location.pathname) {
        replace(nextState.location.pathname)
      } else {
        replace("/")
      }
    }
  }
}

// google analytics
ReactGA.initialize("UA-125119993-1")
function logPageView() {
  ReactGA.set({page: window.location.pathname + window.location.search})
  ReactGA.pageview(window.location.pathname + window.location.search)
}

// let GRAPHQL_URL
// process.env.NODE_ENV === "production" || process.env.NODE_ENV === "prod"
//   ? (GRAPHQL_URL = "http://utterzone.com:3001/graphql")
//   : (GRAPHQL_URL = "http://192.168.68.8:3001/graphql")
const GRAPHQL_URL = "http://localhost:3001/graphql"

const cache = new InMemoryCache({
  cacheRedirects: {
    Query: {
      // example query
      movie: (_, {id}, {getCacheKey}) => getCacheKey({__typename: "Movie", id})
    }
  }
})

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

const logoutUser = () => {
  localStorage.removeItem("AUTH_TOKEN")
}

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({graphQLErrors, networkError}) => {
      if (graphQLErrors) {
        console.log("graphql errors: ", graphQLErrors)
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
      },
      cache
    }),
    new HttpLink({
      uri: GRAPHQL_URL,
      credentials: "include"
    })
  ]),
  cache
})

// wrapped in AppContainer for react-hot-loader
class App extends Component {
  constructor(props) {
    super(props)
  }

  render(props) {
    const toggleFooter = store.getState().toggleFooterReducer.toggle
    return (
      <ApolloProvider client={client}>
        <AppContainer>
          <ThemeProvider theme={main}>
            <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                <Router history={history}>
                  <StyledGrid style={{minHeight: "100vh"}}>
                    <MainNavbar
                      gridarea="navBar"
                      list={["about", "contact", "courses", "pricing", "zones"]}
                      changeMenuOn="640px"
                      largeMenuClassName="large-menu"
                      smallMenuClassName="small-menu"
                    />
                    <Section gridarea="flash">
                      <NavbarSpacer margin="50px 0 0 0" id="spacer" />
                      <FlashMessagesList />
                      {/* TODO: fix
                    <LoadingBar
                      style={{backgroundColor: '#8b1a87', height: '5px'}}
                    />
                   */}
                    </Section>
                    <Section gridarea="content">
                      <Switch>
                        {routes.map((route, i) => (
                          <route.component
                            key={i}
                            path={route.path}
                            {...route}
                            render={props => (
                              // pass the sub-routes down to keep nesting
                              <route.component subroutes={route.routes} />
                            )}
                          />
                        ))}
                      </Switch>
                    </Section>
                    <Footer gridarea="footer" />
                  </StyledGrid>
                </Router>
              </PersistGate>
            </Provider>
          </ThemeProvider>
        </AppContainer>
      </ApolloProvider>
    )
  }
}

render(<App />, document.getElementById("app"))

if (module.hot) {
  module.hot.accept("./App", () => {
    render(App)
  })
}
