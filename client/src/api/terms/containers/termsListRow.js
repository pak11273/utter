import React from 'react'
import {Table} from 'semantic-ui-react'

const TermsListRow = ({term = {}}) => {
  const {name = '', level = '', translation = '', audio = ''} = term

  return (
    <Table.Row>
      <Table.Cell>{level}</Table.Cell>
      <Table.Cell>{name}</Table.Cell>
      <Table.Cell>{translation}</Table.Cell>
      <Table.Cell>{audio}</Table.Cell>
    </Table.Row>
  )
}

export default TermsListRow
