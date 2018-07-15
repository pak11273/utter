import React from 'react'
import {Table} from 'semantic-ui-react'

const UnitsListHeader = () => (
  <Table.Header>
    <Table.Row>
      <Table.HeaderCell width={3}>Username</Table.HeaderCell>
      <Table.HeaderCell width={5}>Email</Table.HeaderCell>
    </Table.Row>
  </Table.Header>
)

export default UnitsListHeader
