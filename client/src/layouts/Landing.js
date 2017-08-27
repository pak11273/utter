import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {selectUser} from '../actions/userActions.js'
import {bindActionCreators} from 'redux'
import {Section} from '../components'

class UserList extends Component {
  render() {
    const list = this.props.users.map(user => {
      return (
        <div>
          <ul>
            <li key={user.id} onClick={() => this.props.selectUser(user)}>
              {user.first}
            </li>
            <li>{user.last}</li>
            <li>{user.age}</li>
            <li>{user.description}</li>
            <li>{user.thumbnail}</li>
          </ul>
          <br />
        </div>
      )
    })

    return (
      <Section>
        {list}
        <br />
      </Section>
    )
  }
}

class Landing extends Component {
  render() {
    return (
      <div>
        <h1>S video</h1>
        <input
          type="text"
          style={{width: '150px', height: '40px', fontSize: '1.4rem'}}
          value={this.props.searchTerm}
          placeholder="Search"
        />
        <Link to="#">Browse</Link>
      </div>
    )
  }
}

// const mapStateToProps = state => {
//   return {searchTerm: state.searchTerm}
// }

// passes redux state obj as a property to your component
const mapStateToProps = state => {
  return {
    users: state.users
  }
}

const matchDispatchToProps = dispatch => {
  return bindActionCreators({selectUser}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(UserList)
// export default connect(mapStateToProps)(Landing)
