import React from 'react'
import {connect} from 'react-redux'
import _ from 'lodash'
import {Button, Icon, Table} from 'semantic-ui-react'
import orm from '../../../app/schema.js'
import {deleteEntity} from '../../../api/entities/actions.js'

const LevelsListRow = ({
  entry = {},
  onLevelClicked = _.noop,
  selected,
  deleteEntity
}) => {
  const {id = null, name = '', level = ''} = entry

  const onDeleteClicked = e => {
    e.stopPropagation()
    e.preventDefault()
    deleteEntity('Levels', id)
  }

  const onRowClicked = () => onLevelClicked(id)

  return (
    <Table.Row onClick={onRowClicked} active={selected}>
      <Table.Cell>{level}</Table.Cell>
      <Table.Cell>{name}</Table.Cell>
      <Table.Cell>
        <Button
          compact
          basic
          circular
          size="tiny"
          color="red"
          icon={<Icon name="delete" />}
          onClick={onDeleteClicked}
        />
      </Table.Cell>
    </Table.Row>
  )
}

const mapStateToProps = (state, ownProps) => {
  // TODO: optimize this with react select
  const session = orm.session(state.entitiesReducer)

  const {Levels} = session

  let entry

  if (Levels.hasId(ownProps.level.id)) {
    const levelModel = Levels.withId(ownProps.level.id)
    entry = {
      ...levelModel.ref
    }
  }

  return {entry}
}

const actions = {
  deleteEntity
}

export default connect(
  mapStateToProps,
  actions
)(LevelsListRow)
