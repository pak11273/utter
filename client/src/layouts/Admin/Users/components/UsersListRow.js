import React from 'react'
import {Table} from 'semantic-ui-react'

const UsersListRow = ({user = {}}) => {
  const {username = '', email = ''} = user

  return (
    <Table.Row>
      <Table.Cell>{username}</Table.Cell>
      <Table.Cell>{email}</Table.Cell>
    </Table.Row>
  )
}

export default UsersListRow
