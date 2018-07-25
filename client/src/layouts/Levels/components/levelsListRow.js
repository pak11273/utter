import React from 'react'
import _ from 'lodash'
import {Table} from 'semantic-ui-react'

const LevelsListRow = ({level = {}, onLevelClicked = _.noop, selected}) => {
  var {id = null, title = '', level = ''} = level

  return (
    <Table.Row onClick={() => onLevelClicked(id)} active={selected}>
      <Table.Cell>{level}</Table.Cell>
      <Table.Cell>{title}</Table.Cell>
    </Table.Row>
  )
}

export default LevelsListRow
