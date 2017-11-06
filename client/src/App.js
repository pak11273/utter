import React, {Component} from 'react'
import {BrowserRouter as Router, Link, Switch, Route} from 'react-router-dom'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import styled, {injectGlobal, ThemeProvider} from 'styled-components'
import jwt from 'jsonwebtoken'
import {routes} from './routes'
import {main} from './themes/config.js'
import {Navbar} from './containers'
import {Spacer, Wrapper} from './components'
import store from './store.js'
import rootReducer from './rootReducer'
import FlashMessagesList from '../src/components/FlashMessages/FlashMessagesList'

//actions
import {setCurrentUser} from './actions/authActions.js'

// box-sizing: border-box;
// display: flex;
// flex-direction: column;
// box-sizing: border-box;
// Global style
// eslint-disable-next-line

injectGlobal`

body, h1, h2, h3, h4, h6, div, li {
  // color: #777;
  color: green;
}

// h1 {
//     font-size: 8rem;
// }

// h2 {
//     font-size: 7rem;
// }

// h3 {
//     font-size: 6rem;
// }

// h4 {
//     font-size: 5rem;
// }

// h5 {
//     font-size: 4rem;
// }

// h6 {
//     font-size: 3rem;
// }

// p, li, a {
//   font-size: 1rem;
//   text-decoration: none;
// }

// a:visited {
//   color: purple;
// }

// // global colors
// body {
//   color: green;
// }
`

class App extends Component {
  render(props) {
    return (
      <ThemeProvider theme={main}>
        <Provider store={store}>
          <Router>
            <Wrapper>
              <Navbar list={['about', 'contact', 'languages', 'connections']} />
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
