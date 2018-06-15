import React, {Component} from 'react'
import {Table} from 'semantic-ui-react'

import LevelsListHeader from './levelsListHeader.js'
import LevelsListRow from './levelsListRow.js'

import {getEntitiesSession} from '../../../api/entities/selectors'

import {selectlevel} from '../actions'
import {selectCurrentlevel} from '../selectors'

export default class levelsList extends Component {
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
