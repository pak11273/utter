import React from 'react'
import {Table} from 'semantic-ui-react'

const LevelsListHeader = () => (
  <Table.Header>
    <Table.Row>
      <Table.HeaderCell width={1}>Rank</Table.HeaderCell>
      <Table.HeaderCell width={6}>Name</Table.HeaderCell>
    </Table.Row>
  </Table.Header>
)

export default LevelsListHeader
