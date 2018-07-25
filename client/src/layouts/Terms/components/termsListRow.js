import React from 'react'
import {Table} from 'semantic-ui-react'

const TermsListRow = ({term = {}}) => {
  const {word = '', level = '', translation = '', audio = ''} = term
  return (
    <Table.Row>
      <Table.Cell>{level}</Table.Cell>
      <Table.Cell>{word}</Table.Cell>
      <Table.Cell>{translation}</Table.Cell>
      <Table.Cell>{audio}</Table.Cell>
    </Table.Row>
  )
}

export default TermsListRow
