import React, {Component} from 'react'
import {Table} from 'semantic-ui-react'

import UsersListHeader from './UsersListHeader'
import UsersListRow from './UsersListRow'

export default class UsersList extends Component {
  render() {
    const {users} = this.props

    const userRows = users.map(user => (
      <UsersListRow user={user} key={user.username} />
    ))

    return (
      <Table celled>
        <UsersListHeader />
        <Table.Body>{userRows}</Table.Body>
      </Table>
    )
  }
}
