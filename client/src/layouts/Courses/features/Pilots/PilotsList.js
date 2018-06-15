import React, {Component} from 'react'
import {Table} from 'semantic-ui-react'

import PilotsListHeader from './PilotsListHeader.js'
import PilotsListRow from './PilotsListRow.js'

import {getEntitiesSession} from '../../../../api/entities/selectors'

import {selectPilot} from './actions'
import {selectCurrentPilot} from './selectors'

export default class PilotsList extends Component {
  render() {
    const {pilots} = this.props

    const pilotRows = pilots.map(pilot => (
      <PilotsListRow pilot={pilot} key={pilot.name} />
    ))

    return (
      <Table celled>
        <PilotsListHeader />
        <Table.Body>{pilotRows}</Table.Body>
      </Table>
    )
  }
}
