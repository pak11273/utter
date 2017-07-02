import React, {Component} from 'react'
import {MemoryRouter, StaticRouter, Route, Switch} from 'react-router-dom'
import Login from './layouts/Login'
import Home from './layouts/Home.js'
import About from './layouts/About.js'
import Contact from './layouts/Contact.js'
import Settings from './layouts/Settings.js'

export default () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/contact" component={Contact} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/settings" component={Settings} />
    </Switch>
  )
}
