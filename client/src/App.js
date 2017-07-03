import React, {Component} from 'react'
import {Link, Switch, Route} from 'react-router-dom'
import Navbar from './containers/Navbars/Navbar'
import Wrapper from './containers/Wrappers/Wrapper.js'
import Home from './layouts/Home.js'
import About from './layouts/About.js'
import Login from './layouts/Login.js'
import Contact from './layouts/Contact.js'
import Signup from './layouts/Signup.js'
import Settings from './layouts/Settings.js'
import test1 from './layouts/Test1.js'
import test2 from './layouts/Test2.js'

import {routes} from './routes'

export default props =>
  <Wrapper>
    <Navbar list={['home', 'about', 'contact', 'test1', 'test2']} />
    <Switch>
      {routes.map(route => <Route {...route} />)}
    </Switch>
  </Wrapper>
