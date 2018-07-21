import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Table} from 'semantic-ui-react'

import PilotsListHeader from './PilotsListHeader.js'
import PilotsListRow from './PilotsListRow.js'

import orm from '../../../../app/schema.js'

import {selectPilot} from './actions.js'
import {selectCurrentPilot} from './selectors.js'

const mapStateToProps = state => {
  const session = orm.session(state.entitiesReducer)
  const {Pilot} = session
  // console.log('pilot: ', Pilot.all().toModelArray())
  // Extract a list of IDs for each Pilot entry
  const pilots = Pilot.all()
    .toModelArray()
    .map(pilotModel => pilotModel.getId())
  // const pilots = ['hello', 'bye']
  const currentPilot = selectCurrentPilot(state)

  // Return the list of pilot IDs and the current pilot ID as props
  return {pilots, currentPilot}
}

// Make an object full of action creators that can be passed to connect
// and bound up, instead of writing a separate mapDispatch function
const actions = {
  selectPilot
}

class PilotsList extends Component {
  render() {
    const {pilots = [], selectPilot, currentPilot} = this.props
    const pilotRows = pilots.map(pilot => (
      <PilotsListRow
        pilot={pilot}
        key={pilot}
        onPilotClicked={selectPilot}
        selected={pilot === currentPilot}
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

export default connect(mapStateToProps, actions)(PilotsList)
