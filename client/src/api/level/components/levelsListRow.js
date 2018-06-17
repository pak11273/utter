import React from 'react'
import {Table} from 'semantic-ui-react'

const LevelsListRow = ({level = {}}) => {
  const {name = '', rank = ''} = level

  return (
    <Table.Row>
      <Table.Cell>{rank}</Table.Cell>
      <Table.Cell>{name}</Table.Cell>
    </Table.Row>
  )
}

export default LevelsListRow
