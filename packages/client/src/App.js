/* eslint-disable prefer-destructuring, dot-notation  */
import React, {Component} from "react"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import {render} from "react-dom"
/* import styled from "styled-components" */
/* import {hot} from "react-hot-loader/root" */
import ReactGA from "react-ga"
import {ApolloProvider as ApolloHooksProvider} from "react-apollo-hooks"
import {ApolloProvider} from "react-apollo"
import {HelmetProvider} from "react-helmet-async"
import {cookies, local, session} from "brownies"
import socket from "./services/socketio/socket-mgr.js"

import {MuiThemeProvider, createMuiTheme} from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import Grid from "@material-ui/core/Grid"
import cyan from "@material-ui/core/colors/cyan"
import blueGrey from "@material-ui/core/colors/blueGrey"
import red from "@material-ui/core/colors/red"

import {ApolloInstance} from "./apollo.js"

import {GlobalStyle} from "./assets/css/global-styles.js"
import {routes} from "./routes"
import {MainNavbar} from "./containers"
import {Section} from "./components"
import NavbarSpacer from "./components/spacers/spacer-navbar.js"
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import {GET_NOTIFICATIONS} from "./graphql/queries/user-queries.js"

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
    primary: cyan,
    secondary: blueGrey,
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

// socketio connection
export const socketio = socket()

// wrapped in AppContainer for react-hot-loader
class App extends Component {
  componentDidMount = async () => {
    if (!session.user) {
      /* const user = await ApolloInstance.query({ */
      /*   query: ME_QUERY */
      /* }) */
      /* session.user = user.data.me */
      delete cookies._uid
      delete session.user
      delete local.notified
    }

    if (session.user && !local.notified) {
      const notifications = await ApolloInstance.query({
        query: GET_NOTIFICATIONS
      })
      var temp = local.notifications || []
      var requests = temp.concat(
        ...notifications.data.getNotifications.requests
      )
      // merge in requests
      local.notifications = requests
      local.notified = true
    }

    // TODO: keep users from opening up sessions in new tabs
    // delete session if user cookies is deleted
    /* if (!session.user) { */
    /*   // auto redirects to login */
    /*   delete cookies._uid */
    /*   delete session.user */
    /* } */
    // Broadcast that your're opening a page.
    /* local.openpages = Date.now() */
    /* var onLocalStorageEvent = e => { */
    /*   if (e.key === "openpages") { */
    /*     // Listen if anybody else opening the same page! */
    /*     localStorage.page_available = Date.now() */
    /*   } */
    /*   if (e.key === "page_available") { */
    /*     toast.warn( */
    /*       "Sessions cannot be duplicated.  Open with a different browser to keep sessions.", */
    /*       { */
    /*         className: "toasty", */
    /*         bodyClassName: "toasty-body", */
    /*         hideProgressBar: true */
    /*       } */
    /*     ) */
    /*   } */
    /* } */
    /* window.addEventListener("storage", onLocalStorageEvent, false) */
  }

  componentWillUnmount = () => {
    local.notified = false
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
