import {createStore, applyMiddleware, compose} from 'redux'
import rootReducer from './rootReducer'
import setAuthorizationToken from './utils/setAuthorizationToken.js'
import {setCurrentUser} from './actions/authActions.js'
import jwt from 'jsonwebtoken'
import SocketIO from './services/socketio'
const Socket = new SocketIO()

// redux middleware
// import {createLogger} from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import ioMiddleware from 'redux-socketio' // TODO: currently grabbing from npm globally(npm link redux-socketio), need to unlink once it's production ready and download the npm module

// redux-dev tools requirement
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// OPTION: add this line to your middleware args if you want to use redux logger
// createLogger({collapsed: true}),
const store = createStore(
  rootReducer,
  /* preloadedState, */ composeEnhancers(
    applyMiddleware(ioMiddleware(Socket), thunk, promise())
  )
)

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken)
  store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)))
}

Socket.on('receive msg', msg => {
  console.log('we got it from : ', msg)
})
export default store
