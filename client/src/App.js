import React, {Component} from 'react'
import {BrowserRouter as Router, Link, Switch, Route} from 'react-router-dom'
import styled, {ThemeProvider} from 'styled-components'
import Navbar from './containers/Navbars/Navbar'
import Wrapper from './containers/Wrappers/Wrapper.js'
import Spacer from './components/Spacers/Spacer.js'
import {render} from 'react-dom'
import {routes} from './routes'
import {main} from './themes/config.js'
import rootReducer from './rootReducer'
import FlashMessagesList from '../src/components/FlashMessages/FlashMessagesList'
import setAuthorizationToken from './utils/setAuthorizationToken.js'
import jwt from 'jsonwebtoken'
import {setCurrentUser} from './actions/authActions.js'

// redux settings
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import {createStore, applyMiddleware, compose} from 'redux'

// with redux-dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  rootReducer,
  /* preloadedState, */ composeEnhancers(applyMiddleware(thunk))
)

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken)
  store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)))
}

class App extends Component {
  render(props) {
    return (
      <ThemeProvider theme={main}>
        <Provider store={store}>
          <Router>
            <Wrapper>
              <Navbar list={['about', 'contact', 'languages', 'connections']} />
              <Spacer margin="90px 0 0 0" />
              <FlashMessagesList />
              <Switch>
                {routes.map((route, i) => <Route key={i} {...route} />)}
              </Switch>
            </Wrapper>
          </Router>
        </Provider>
      </ThemeProvider>
    )
  }
}

render(<App />, document.getElementById('app'))
