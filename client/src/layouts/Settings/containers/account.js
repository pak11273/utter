import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Form, Dropdown, Segment} from 'semantic-ui-react'
import orm from '../../../app/schema.js'

const NATIVE_LANG = [
  {value: 'en', text: 'English'},
  {value: 'ko', text: 'Korean'}
]

// import {selectUserInfo} from '../../../../api/user/selectors.js'

class AccountInfo extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    // const {unitInfo} = this.props
    // const {name, affiliation} = unitInfo

    console.log('props: ', this.props)
    return (
      <Segment attached="bottom">
        <Form size="large">
          <Form.Field name="name" width={6}>
            <label>Username</label>
            <input placeholder="Name" defaultValue="my name" />
          </Form.Field>
          <Form.Field name="email" width={6}>
            <label>Email</label>
            <input placeholder="Email" defaultValue="my email" />
          </Form.Field>
          <Form.Field name="native-language" width={6}>
            <label>Native Language</label>
            <Dropdown selection options={NATIVE_LANG} defaultValue="en" />
          </Form.Field>
        </Form>
      </Segment>
    )
  }
}

const mapStateToProps = state => {
  // Create a Redux-ORM Session from our "entities" slice, which
  // contains the "tables" for each model type
  const session = orm.from(state.entities)

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

  const user = User.all().toRefArray()

  // Now that we have an array of all pilot objects, return it as a prop
  // return {users}
  return {user}
}

export default connect(mapStateToProps)(AccountInfo)
