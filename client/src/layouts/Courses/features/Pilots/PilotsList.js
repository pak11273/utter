import React, {Component} from 'react'
import {Table} from 'semantic-ui-react'

import PilotsListHeader from './PilotsListHeader.js'
import PilotsListRow from './PilotsListRow.js'

export default class PilotsList extends Component {
  render() {
    const {pilots, onPilotClicked, currentPilot} = this.props
    const pilotRows = pilots.map(pilot => (
      <PilotsListRow
        pilot={pilot}
        key={pilot.name}
        onPilotClicked={onPilotClicked}
        selected={pilot.id === currentPilot}
      />
    ))

    return (
      <Table celled>
        <PilotsListHeader />
        <Table.Body>{pilotRows}</Table.Body>
      </Table>
    )
  }
}
