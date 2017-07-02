// import React, {Component} from 'react'

// class App extends Component {
//   render() {
//     return (
//       <div>
//         <Home />
//       </div>
//     )
//   }
// }

// export default App

import React, {Component} from 'react'
import {MemoryRouter, StaticRouter, Route, Switch} from 'react-router-dom'
import Login from './layouts/Login'
import Home from './layouts/Home.js'

export default () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
    </Switch>
  )
}
