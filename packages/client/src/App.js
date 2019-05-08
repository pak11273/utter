import React, {Component} from "react"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import {render} from "react-dom"
/* import styled from "styled-components" */
/* import {hot} from "react-hot-loader/root" */
import ReactGA from "react-ga"
import {ApolloProvider as ApolloHooksProvider} from "react-apollo-hooks"
import {ApolloProvider} from "react-apollo"
import {HelmetProvider} from "react-helmet-async"
/* import {cookies, subscribe} from "brownies" */

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

/* import {sessionDelete} from "./utils/session-delete.js" */

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

// wrapped in AppContainer for react-hot-loader
class App extends Component {
  componentDidMount = async () => {
    // TODO: interferes when someone signs up and has another tab open and then lands on the confirmed email page.
    // delete session if user cookies is deleted
    /* subscribe(cookies, "_uid", value => { */
    /*   if (!value) { */
    /*     sessionDelete() */
    /*     window.location = "/login" */
    /*   } */
    /* }) */
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
