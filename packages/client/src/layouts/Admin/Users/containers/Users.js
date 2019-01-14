import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Grid, Table, Segment, Header, Form, Dropdown} from 'semantic-ui-react'
import UsersList from '../components/UsersList.js'
import UsersDetails from '../components/UsersDetails.js'
import orm from '../../../../app/schema.js'

const RANKS = [
  {value: 'Private', text: 'Private'},
  {value: 'Corporal', text: 'Corporal'},
  {value: 'Sergeant', text: 'Sergeant'},
  {value: 'Lieutenant', text: 'Lieutenant'},
  {value: 'Captain', text: 'Captain'},
  {value: 'Major', text: 'Major'},
  {value: 'Colonel', text: 'Colonel'}
]

const MECHS = [{value: 'WHM-6R', text: 'Warhammer WHM-6R'}]

class Users extends Component {
  render() {
    const {users} = this.props
    const currentUser = users[0] || {}

    return (
      <Segment>
        <Grid>
          <Grid.Column width={10}>
            <Header as="h3">Users</Header>
            <UsersList users={users} />
          </Grid.Column>
          <Grid.Column width={6}>
            <Header as="h3">User Details</Header>
            <Segment>
              <UsersDetails user={currentUser} />
            </Segment>
          </Grid.Column>
        </Grid>
      </Segment>
    )
  }
}

const mapStateToProps = state => {
  const session = orm.session(state.apiReducer)
  const {Users} = session
  const users = Users.all().toRefArray()
  return {users}
}

export default connect(mapStateToProps)(Users)
