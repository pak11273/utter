import React from 'react'
import {Table} from 'semantic-ui-react'

const LevelsListRow = ({level = {}}) => {
  var {title = '', level = ''} = level

  return (
    <Table.Row>
      <Table.Cell>{level}</Table.Cell>
      <Table.Cell>{title}</Table.Cell>
    </Table.Row>
  )
}

export default LevelsListRow
