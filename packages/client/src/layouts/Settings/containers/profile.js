import React, {Component} from "react"
import {connect} from "react-redux"
import orm from "../../../core/schema.js"

// import {selectUserInfo} from '../../../../api/user/selectors.js'

class Profile extends Component {
  render() {
    /* const {user} = this.props */
    return (
      <form size="large">
        <div>Avatar</div>
        <input placeholder="Avatar" defaultValue="username changem" disabled />
        <div>Followers</div>
        <input placeholder="Followers" defaultValue={1} readOnly />
      </form>
    )
  }
}

const mapStateToProps = state => {
  // Create a Redux-ORM Session from our "entities" slice, which
  // contains the "tables" for each model type
  const session = orm.session(state.apiReducer)

  // Retrieve the model class that we need.  Each Session
  // specifically "binds" model classes to itself, so that
  // updates to model instances are applied to that session.
  // These "bound classes" are available as fields in the sesssion.
  const {User} = session

  // Query the session for all User instances.
  // The QuerySet that is returned from all() can be used to
  // retrieve instances of the User class, or retrieve the
  // plain JS objects that are actually in the store.
  // The toRefArray() method will give us an array of the
  // plain JS objects for each item in the QuerySet.

  const user = User.first()

  // Now that we have an array of all pilot objects, return it as a prop
  // return {users}
  return {user}
}

export default connect(mapStateToProps)(Profile)
