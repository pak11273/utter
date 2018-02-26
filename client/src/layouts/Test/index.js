import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavLink, Route} from 'react-router-dom'
import Blah from './Blah.js'

class Test extends Component {
  constructor() {
    super()
  }
  render() {
    const {match} = this.props
    return (
      <div>
        <h1>test</h1>
        <h1>Create</h1>
        <NavLink to="/test/create">to thing</NavLink>
        <div>routes</div>
        <Route exact path={match.url + '/create'} component={Blah} />
      </div>
    )
  }
}

export default Test
