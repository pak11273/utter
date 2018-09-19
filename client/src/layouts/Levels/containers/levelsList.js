import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Table} from 'semantic-ui-react'
import orm from '../../../app/schema.js'

import LevelsListHeader from '../components/levelsListHeader.js'
import LevelsListRow from './levelsListRow.js'

import {getEntitiesSession} from '../../../api/entities/selectors'

import {selectLevel} from '../../../api/levels/levelsActions.js'
import {selectCurrentLevel} from '../../../api/levels/selectors.js'

class levelsList extends Component {
  render() {
    const {levels = [], selectLevel, currentLevel} = this.props

    const levelRows = levels.map(level => (
      <LevelsListRow
        level={level}
        key={level.id}
        onLevelClicked={selectLevel}
        selected={level.id === currentLevel}
      />
    ))

    return (
      <Table celled>
        <LevelsListHeader />
        <Table.Body>{levelRows}</Table.Body>
      </Table>
    )
  }
}

const mapStateToProps = state => {
  const session = orm.session(state.entitiesReducer)

  const {Levels} = session
  // Extract a list of IDs for each Level entry
  // TODO optimize this with react-select.  Also, map is expensive here.
  const levels = Levels.all()
    .toModelArray()
    .map(levelModel => {
      const level = {
        ...levelModel.ref
      }

      return level
    })

  const currentLevel = selectCurrentLevel(state)

  // Return the list of level IDs and the current level ID as props
  return {levels, currentLevel}
}

const actions = {
  selectLevel
}

export default connect(
  mapStateToProps,
  actions
)(levelsList)
