import React, {Component} from 'react'
import {BrowserRouter as Router, Link, Switch, Route} from 'react-router-dom'
import styled, {ThemeProvider} from 'styled-components'
import Navbar from './containers/Navbars/Navbar'
import Wrapper from './containers/Wrappers/Wrapper.js'
import {render} from 'react-dom'
import {routes} from './routes'
import {main} from './themes/config.js'

// redux settings
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import {createStore, applyMiddleware} from 'redux'

const store = createStore((state = {}) => state, applyMiddleware(thunk))

class App extends Component {
  render(props) {
    return (
      <ThemeProvider theme={main}>
        <Provider store={store}>
          <Router>
            <Wrapper>
              <Navbar list={['about', 'contact']} />
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
