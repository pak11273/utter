import React from 'react'
import {Table} from 'semantic-ui-react'

const UsersListRow = ({user = {}}) => {
  const {
    username = '',
    rank = '',
    age = '',
    gunnery = '',
    usering = '',
    mechType = ''
  } = user

  return (
    <Table.Row>
      <Table.Cell>{username}</Table.Cell>
      <Table.Cell>{rank}</Table.Cell>
      <Table.Cell>{age}</Table.Cell>
      <Table.Cell>
        {gunnery}/{usering}
      </Table.Cell>
      <Table.Cell>{mechType}</Table.Cell>
    </Table.Row>
  )
}

export default UsersListRow
