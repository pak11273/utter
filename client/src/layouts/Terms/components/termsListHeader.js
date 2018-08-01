import React from 'react'
import {Table} from 'semantic-ui-react'

const TermsListHeader = () => (
  <Table.Header>
    <Table.Row>
      <Table.HeaderCell width={1}>Level</Table.HeaderCell>
      <Table.HeaderCell width={5}>Word</Table.HeaderCell>
      <Table.HeaderCell width={5}>Translation</Table.HeaderCell>
      <Table.HeaderCell width={3}>audio</Table.HeaderCell>
    </Table.Row>
  </Table.Header>
)

export default TermsListHeader
