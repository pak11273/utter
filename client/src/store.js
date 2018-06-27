import {createStore, applyMiddleware, compose} from 'redux'
import {routerMiddleware} from 'react-router-redux'
import jwt from 'jsonwebtoken'

import SocketIO from './services/socketio'
import rootSaga from './rootSaga.js'
const Socket = new SocketIO()
import history from './history.js'

import rootReducer from './rootReducer.js'
const middleware = routerMiddleware(history)

// redux-persist
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage
const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// redux middleware
import {createLogger} from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import ioMiddleware from 'redux-socketio' // TODO: currently grabbing from npm globally(npm link redux-socketio), need to unlink once it's production ready and download the npm module

// redux-dev tools requirement
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const sagaMiddleware = createSagaMiddleware()

let store = createStore(
  persistedReducer,
  /* preloadedState, */ composeEnhancers(
    applyMiddleware(
      // createLogger({collapsed: true}),
      thunk,
      middleware,
      ioMiddleware(Socket),
      promise(),
      sagaMiddleware
    )
  )
)

let persistor = persistStore(store)

sagaMiddleware.run(rootSaga)

export {store, persistor}
