import {createStore, applyMiddleware, compose} from "redux"
import {routerMiddleware} from "react-router-redux"
import {persistStore, persistReducer} from "redux-persist"
import storage from "redux-persist/lib/storage" // defaults to localStorage
import SocketIOClass from "./services/socketio"
import createSagaMiddleware from "redux-saga"
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"
import ioMiddleware from "redux-socketio"
import history from "@utterzone/connector"
import rootSaga from "./rootSaga.js"
import rootReducer from "./rootReducer.js"

export const SocketIO = new SocketIOClass()

// redux-persist
const persistConfig = {
  key: "root",
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// redux-dev tools requirement
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  persistedReducer,
  /* preloadedState, */ composeEnhancers(
    applyMiddleware(
      sagaMiddleware,
      thunk,
      routerMiddleware(history),
      ioMiddleware(SocketIO),
      promise()
    )
  )
)

const persistor = persistStore(store)

sagaMiddleware.run(rootSaga)

export {store, persistor}
