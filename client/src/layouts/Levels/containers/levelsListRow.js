import React from 'react'
import {connect} from 'react-redux'
import _ from 'lodash'
import {Table} from 'semantic-ui-react'
import orm from '../../../app/schema.js'

const LevelsListRow = ({entry = {}, onLevelClicked = _.noop, selected}) => {
  const {id = null, title = '', level = ''} = entry
  return (
    <Table.Row onClick={() => onLevelClicked(id)} active={selected}>
      <Table.Cell>{level}</Table.Cell>
      <Table.Cell>{title}</Table.Cell>
    </Table.Row>
  )
}

const mapStateToProps = (state, ownProps) => {
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

export default connect(mapStateToProps)(LevelsListRow)
