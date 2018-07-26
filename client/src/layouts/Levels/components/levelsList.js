import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Table} from 'semantic-ui-react'
import orm from '../../../app/schema.js'

import LevelsListHeader from './levelsListHeader.js'
import LevelsListRow from './levelsListRow.js'

import {getEntitiesSession} from '../../../api/entities/selectors'

import {selectlevel} from '../../../api/levels/actions.js'
import {selectCurrentLevel} from '../../../api/levels/selectors.js'

class levelsList extends Component {
  render() {
    const {levels, onLevelClicked, currentLevel} = this.props

    const levelRows = levels.map(level => (
      <LevelsListRow
        level={level}
        key={level.id}
        onLevelClicked={onLevelClicked}
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
  // const levels = Levels.all().toRefArray.map(level => level.getId())

  const levels = Levels.all().toRefArray()
  // .map(level => level.Id)
  // const levels = [{name: 'bye'}, {name: 'hello'}]

  const currentLevel = selectCurrentLevel(state)

  // Return the list of level IDs and the current level ID as props
  return {levels, currentLevel}
}

export default connect(mapStateToProps)(levelsList)
