import React, {Component} from 'react'
import {BrowserRouter as Router, Link, Switch, Route} from 'react-router-dom'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import styled, {injectGlobal, ThemeProvider} from 'styled-components'
import jwt from 'jsonwebtoken'
import '../src/assets/css/global-styles.js'
import {routes} from './routes'
import {main} from './themes/config.js'
import {Navbar} from './containers'
import {Spacer, Wrapper} from './components'
import store from './store.js'
import rootReducer from './rootReducer'
import FlashMessagesList from '../src/components/FlashMessages/FlashMessagesList'

//actions
import {setCurrentUser} from './actions/authActions.js'

class App extends Component {
  render(props) {
    return (
      <ThemeProvider theme={main}>
        <Provider store={store}>
          <Router>
            <Wrapper>
              <Navbar
                list={[
                  'about',
                  'contact',
                  'languages',
                  'pricing',
                  'connections'
                ]}
              />
              <Spacer margin="90px 0 0 0" />
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
