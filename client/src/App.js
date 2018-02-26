import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {BrowserRouter as Router, Link, Switch, Route} from 'react-router-dom'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import styled, {ThemeProvider} from 'styled-components'
import jwt from 'jsonwebtoken'
import {AppContainer} from 'react-hot-loader'

import './assets/css/global-styles.js'
import {routes} from './routes'
import {main} from './themes/config.js'
import {Footer, MainNavbar} from './containers'
import {Grid, Section} from './components'
import NavbarSpacer from './components/Spacers/NavbarSpacer.js'
import store from './store.js'
import rootReducer from './rootReducer'
import FlashMessagesList from './components/FlashMessages/FlashMessagesList'

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
  render(props) {
    const toggleFooter = store.getState().toggleFooterReducer.toggle
    return (
      <AppContainer>
        <ThemeProvider theme={main}>
          <Provider store={store}>
            <Router>
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
                    {routes.map((route, i) => <Route key={i} {...route} />)}
                  </Switch>
                </Section>
                <Footer gridarea="footer">
                  <p>Footer here</p>
                </Footer>
              </StyledGrid>
            </Router>
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
