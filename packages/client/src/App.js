import React, {Component} from "react"
/* import {Switch, Route} from "react-router-dom" */
import {render} from "react-dom"
/* import styled from "styled-components" */
/* import {hot} from "react-hot-loader/root" */
/* import ReactGA from "react-ga" */
import {ApolloProvider} from "react-apollo"
/* import {local, session} from "brownies" */

import {MuiThemeProvider, createMuiTheme} from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import blue from "@material-ui/core/colors/blue"
import yellow from "@material-ui/core/colors/yellow"
import red from "@material-ui/core/colors/red"

import client from "./apollo.js"

/* import "./assets/css/global-styles.js" */
/* import {routes} from "./routes" */
/* import {Footer, MainNavbar} from "./containers" */
/* import {Grid, Section} from "./components" */
/* import NavbarSpacer from "./components/spacers/spacer-navbar.js" */
/* import FlashMessagesList from "./components/flashmessages/flashmessages-list" */
/* import {history} from "@utterzone/connector" */
/* import {ToastContainer} from "react-toastify" */

/* import gql from "graphql-tag" */

/* const GET_USER_BY_TOKEN = gql` */
/*   query getUserByToken($token: String!) { */
/*     getUserByToken(token: $token) { */
/*       _id */
/*       username */
/*       blocked */
/*       contacts */
/*       createdCourses { */
/*         _id */
/*       } */
/*       roles */
/*       scopes */
/*       subscriptions { */
/*         _id */
/*       } */
/*     } */
/*   } */
/* ` */

/* const SubRoutes = route => ( */
/*   <Route */
/*     path={route.path} */
/*     render={props => <route.component {...props} routes={route.routes} />} */
/*   /> */
/* ) */

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

/* const StyledGrid = styled(Grid)` */
/*   display: grid; */
/*   grid-template-rows: auto auto 1fr; */
/*   grid-template-areas: */
/*     "navBar" */
/*     "flash" */
/*     "content" */
/*     "footer"; */
/*   margin: 0 auto; */
/* ` */

// google analytics
/* ReactGA.initialize("UA-125119993-1") */
/* ReactGA.pageview(window.location.pathname + window.location.search) */

// wrapped in AppContainer for react-hot-loader
class App extends Component {
  /* componentDidMount = async () => { */
  /*   const token = local.AUTH_TOKEN */

  /*   if (token) { */
  /*     const userByToken = await client.query({ */
  /*       query: GET_USER_BY_TOKEN, */
  /*       variables: {token} */
  /*     }) */

  /*     session.user = userByToken.data.getUserByToken */
  /*   } */
  /* } */

  render() {
    return (
      <ApolloProvider client={client}>
        <MuiThemeProvider theme={theme}>
          <div>hi</div>
          /*
          <CssBaseline />
          <ToastContainer position="top-left" className="toast-container" />
          <StyledGrid style={{minHeight: "100vh"}}>
            <MainNavbar
              gridarea="navBar"
              list={["about", "contact", "courses", "pricing", "zones"]}
              changeMenuOn="640px"
              largeMenuClassName="large-menu"
              smallMenuClassName="small-menu"
            />
            <Section gridarea="flash">
              <NavbarSpacer id="spacer" />
              <FlashMessagesList />
            </Section>
            <Section gridarea="content">
              <Switch>
                {routes.map((route, i) => (
                  <SubRoutes key={i} {...route} />
                ))}
              </Switch>
            </Section>
            <Footer gridarea="footer" />
          </StyledGrid>
          */
        </MuiThemeProvider>
      </ApolloProvider>
    )
  }
}

/* const HotApp = hot(App) */

render(<App />, document.getElementById("app"))
