import React, {Component} from 'react'
import {render} from 'react-dom'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Login from './layouts/Login'
import Home from './layouts/Home.js'

import App from './App'

render(
  <Router>
    <App />
  </Router>,
  document.getElementById('app')
)
