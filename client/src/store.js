import {createStore, applyMiddleware, compose} from 'redux'
import rootReducer from './rootReducer'
import setAuthorizationToken from './utils/setAuthorizationToken.js'
import {setCurrentUser} from './actions/authActions.js'
import jwt from 'jsonwebtoken'
import SocketIO from './services/socketio'
import rootSaga from './rootSaga.js'
const Socket = new SocketIO()
import history from './history.js'
import {routerMiddleware} from 'react-router-redux'
const middleware = routerMiddleware(history)

// redux middleware
// import {createLogger} from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import ioMiddleware from 'redux-socketio' // TODO: currently grabbing from npm globally(npm link redux-socketio), need to unlink once it's production ready and download the npm module

// redux-dev tools requirement
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// OPTION: add this line to your middleware args if you want to use redux logger
// createLogger({collapsed: true}),
const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  rootReducer,
  /* preloadedState, */ composeEnhancers(
    applyMiddleware(
      middleware,
      ioMiddleware(Socket),
      thunk,
      promise(),
      sagaMiddleware
    )
  )
)

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken)
  store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)))
}

sagaMiddleware.run(rootSaga)

export default store
