import React from "react"
import {Switch} from "react-router-dom"
import {render} from "react-dom"
import {Provider} from "react-redux"
import styled, {ThemeProvider} from "styled-components"
import {AppContainer} from "react-hot-loader"
import {ConnectedRouter as Router} from "react-router-redux"
import ReactGA from "react-ga"

import {ApolloProvider} from "react-apollo"
import client from "./apollo.js"

import "./assets/css/global-styles.js"
import {routes} from "./routes"
import {main} from "./themes/config.js"
import {Footer, MainNavbar} from "./containers"
import {Grid, Section} from "./components"
import NavbarSpacer from "./components/Spacers/NavbarSpacer.js"
import {store, persistor} from "./store.js"
import FlashMessagesList from "./components/FlashMessages/FlashMessagesList"
import {history} from "@utterzone/connector"
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

// google analytics
ReactGA.initialize("UA-125119993-1")
ReactGA.pageview(window.location.pathname + window.location.search)

// wrapped in AppContainer for react-hot-loader
const App = () => (
  /* const toggleFooter = store.getState().toggleFooterReducer.toggle */
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
                </Section>
                <Section gridarea="content">
                  <Switch>
                    {routes.map((route, i) => (
                      <route.component
                        key={i}
                        path={route.path}
                        {...route}
                        render={() => (
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

render(<App />, document.getElementById("app"))

if (module.hot) {
  module.hot.accept("./App", () => {
    render(App)
  })
}
