import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {Link, Switch, Route} from 'react-router-dom'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import styled, {ThemeProvider} from 'styled-components'
import jwt from 'jsonwebtoken'
import {AppContainer} from 'react-hot-loader'
import {ConnectedRouter as Router} from 'react-router-redux'
import './assets/css/global-styles.js'
import {routes} from './routes'
import {main} from './themes/config.js'
import {Footer, MainNavbar} from './containers'
import {Grid, Section} from './components'
import NavbarSpacer from './components/Spacers/NavbarSpacer.js'
import {store, persistor} from './store.js'
import FlashMessagesList from './components/FlashMessages/FlashMessagesList'
import history from './history.js'
import {PersistGate} from 'redux-persist/integration/react'

//actions
// import {setCurrentUser} from './actions/authActions.js' TODO: possibly remove

const StyledGrid = styled(Grid)`
  display: grid;
  grid-template-areas:
    'navbar'
    'flash'
    'content'
    'footer';
  margin: 0 auto;
`

// wrapped in AppContainer for react-hot-loader
class App extends Component {
  constructor(props) {
    super(props)
  }
  render(props) {
    const toggleFooter = store.getState().toggleFooterReducer.toggle
    return (
      <AppContainer>
        <ThemeProvider theme={main}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <Router history={history}>
                <StyledGrid>
                  <MainNavbar
                    gridarea="navbar"
                    list={[
                      'about',
                      'contact',
                      'courses',
                      'pricing',
                      'connections'
                    ]}
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
                      {routes.map(route => (
                        <route.component
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
                  <Footer gridarea="footer">
                    <p>Footer here</p>
                  </Footer>
                </StyledGrid>
              </Router>
            </PersistGate>
          </Provider>
        </ThemeProvider>
      </AppContainer>
    )
  }
}

render(<App />, document.getElementById('app'))

if (module.hot) {
  module.hot.accept('./App', () => {
    render(App)
  })
}
