import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Table} from 'semantic-ui-react'
import orm from '../../../app/schema.js'

import LevelsListHeader from './levelsListHeader.js'
import LevelsListRow from './levelsListRow.js'

import {getEntitiesSession} from '../../../api/entities/selectors'

import {selectlevel} from '../actions'
import {selectCurrentLevel} from '../selectors'

const mapStateToProps = state => {
  const session = orm.session(state.entitiesReducer)

  const {Level} = session

  // Extract a list of IDs for each Level entry
  // const levels = Level.all().toModelArray.map(levelModel => levelModel.getId())
  const levels = [{name: 'bye'}, {name: 'hello'}]

  const currentLevel = selectCurrentLevel(state)

  // Return the list of level IDs and the current level ID as props
  return {levels, currentLevel}
}

class levelsList extends Component {
  render() {
    const {levels} = this.props

    const levelRows = levels.map(level => (
      <LevelsListRow level={level} key={level.name} />
    ))

    return (
      <Table celled>
        <LevelsListHeader />
        <Table.Body>{levelRows}</Table.Body>
      </Table>
    )
  }
}

export default connect(mapStateToProps)(levelsList)
