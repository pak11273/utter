import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route, Match} from 'react-router-dom'
import routes from './routes.js'
import App from './App'

ReactDOM.render(
  <BrowserRouter>
    <Router>
      <App />
    </Router>
  </BrowserRouter>,
  document.getElementById('app')
)
