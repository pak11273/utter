import React, {Component} from "react"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import {render} from "react-dom"
/* import styled from "styled-components" */
/* import {hot} from "react-hot-loader/root" */
import ReactGA from "react-ga"
import {ApolloProvider as ApolloHooksProvider} from "react-apollo-hooks"
import {ApolloProvider} from "react-apollo"
import {HelmetProvider} from "react-helmet-async"
import {cookies, session} from "brownies"

import {MuiThemeProvider, createMuiTheme} from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import Grid from "@material-ui/core/Grid"
import blue from "@material-ui/core/colors/blue"
import yellow from "@material-ui/core/colors/yellow"
import red from "@material-ui/core/colors/red"

import {ApolloInstance} from "./apollo.js"

import {GlobalStyle} from "./assets/css/global-styles.js"
import {routes} from "./routes"
import {MainNavbar} from "./containers"
import {Section} from "./components"
import NavbarSpacer from "./components/spacers/spacer-navbar.js"
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import gql from "graphql-tag"

export const GET_USER_BY_TOKEN = gql`
  query getUserByToken($token: String!) {
    getUserByToken(token: $token) {
      blocked
      contacts
      createdCourses {
        _id
      }
      _id
      roles
      rights
      subscriptions {
        _id
        title
        levels {
          _id
        }
      }
      username
    }
  }
`

const SubRoutes = route => (
  <Route
    path={route.path}
    render={props => <route.component {...props} routes={route.routes} />}
  />
)

// Material UI Theme
const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: yellow,
    secondary: blue,
    error: red
  },
  status: {
    danger: red,
    warning: "orange"
  }
})

// google analytics
ReactGA.initialize("UA-125119993-1")
ReactGA.pageview(window.location.pathname + window.location.search)

// wrapped in AppContainer for react-hot-loader
class App extends Component {
  componentDidMount = async () => {
    const token = cookies._uid

    if (!session.user) {
      const userByToken = await ApolloInstance.query({
        query: GET_USER_BY_TOKEN,
        variables: {token}
      })

      session.user = userByToken.data.getUserByToken
    }
  }

  render() {
    return (
      <HelmetProvider>
        <ApolloProvider client={ApolloInstance}>
          <ApolloHooksProvider client={ApolloInstance}>
            <GlobalStyle />
            <MuiThemeProvider theme={theme}>
              <CssBaseline />
              <ToastContainer position="top-left" className="toast-container" />
              <Router>
                <Grid>
                  <MainNavbar
                    list={["about", "contact", "courses", "pricing", "zones"]}
                    changeMenuOn="640px"
                    largeMenuClassName="large-menu"
                    smallMenuClassName="small-menu"
                  />
                  <Section>
                    <NavbarSpacer id="spacer" />
                  </Section>
                  <Section>
                    <Switch>
                      {routes.map((route, i) => (
                        <SubRoutes key={i} {...route} />
                      ))}
                    </Switch>
                  </Section>
                </Grid>
              </Router>
            </MuiThemeProvider>
          </ApolloHooksProvider>
        </ApolloProvider>
      </HelmetProvider>
    )
  }
}

render(<App />, document.getElementById("app"))
