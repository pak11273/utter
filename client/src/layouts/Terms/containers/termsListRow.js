import React from 'react'
import _ from 'lodash'
import {Table} from 'semantic-ui-react'

const TermsListRow = ({term = {}, onTermClicked = _.noop, selected}) => {
  const {id = null, word = '', level = '', translation = '', audio = ''} = term
  return (
    <Table.Row onClick={() => onTermClicked(id)} active={selected}>
      <Table.Cell>{level}</Table.Cell>
      <Table.Cell>{word}</Table.Cell>
      <Table.Cell>{translation}</Table.Cell>
      <Table.Cell>{audio}</Table.Cell>
    </Table.Row>
  )
}

export default TermsListRow
