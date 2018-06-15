import React from 'react'
import {Table} from 'semantic-ui-react'

const LevelsListRow = ({level = {}}) => {
  const {
    name = '',
    rank = '',
    age = '',
    gunnery = '',
    leveling = '',
    mechType = ''
  } = level

  return (
    <Table.Row>
      <Table.Cell>{name}</Table.Cell>
      <Table.Cell>{rank}</Table.Cell>
      <Table.Cell>{age}</Table.Cell>
      <Table.Cell>
        {gunnery}/{leveling}
      </Table.Cell>
      <Table.Cell>{mechType}</Table.Cell>
    </Table.Row>
  )
}

export default LevelsListRow
