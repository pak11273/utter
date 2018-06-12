import React, {Component} from 'react'
import {connect} from 'react-redux'

import {Grid, Segment, Header} from 'semantic-ui-react'

import PilotsList from './PilotsList.js'
import PilotDetails from './PilotDetails.js'
import PilotCommands from './PilotCommands.js'

// const pilots = [
//   {
//     name: 'Natasha Kerensky',
//     rank: 'Captain',
//     age: 52,
//     gunnery: 2,
//     piloting: 3,
//     mechType: 'WHM-6R'
//   }
// ]

// export default class Pilots extends Component {
//   state = {
//     pilots: Pilots
//   }

//   render() {
//     const {pilots} = this.state

//     const currentPilot = pilots[0] || {}

//     return (
//       <Segment>
//         <Grid>
//           <Grid.Column width={10}>
//             <Header as="h3">Pilot List</Header>
//             <PilotsList pilots={pilots} />
//           </Grid.Column>
//           <Grid.Column width={6}>
//             <Header as="h3">Pilot Details</Header>
//             <Segment>
//               <PilotDetails pilot={currentPilot} />
//             </Segment>
//             <Segment>
//               <PilotCommands />
//             </Segment>
//           </Grid.Column>
//         </Grid>
//       </Segment>
//     )
//   }
// }

// Omit imports not relevant to this commit
import schema from '../../../../app/schema'

const mapStateToProps = state => {
  // Create a Redux-ORM Session from our "entities" slice, which
  // contains the "tables" for each model type
  const session = schema.session(state.entitiesReducer)

  // Retrieve the model class that we need.  Each Session
  // specifically "binds" model classes to itself, so that
  // updates to model instances are applied to that session.
  // These "bound classes" are available as fields in the sesssion.
  const {Pilot} = session

  // Query the session for all Pilot instances.
  // The QuerySet that is returned from all() can be used to
  // retrieve instances of the Pilot class, or retrieve the
  // plain JS objects that are actually in the store.
  // The toRefArray() method will give us an array of the
  // plain JS objects for each item in the QuerySet.
  const pilots = Pilot.all().toRefArray()

  // Now that we have an array of all pilot objects, return it as a prop
  return {pilots}
}

export class Pilots extends Component {
  render() {
    const {pilots} = this.props

    // Use the first pilot as the "current" one for display, if available.
    const currentPilot = pilots[0] || {}

    // Omit rendering code, which didn't change
    return (
      <Segment>
        <Grid>
          <Grid.Column width={10}>
            <Header as="h3">Pilot List</Header>
            <PilotsList pilots={pilots} />
          </Grid.Column>
          <Grid.Column width={6}>
            <Header as="h3">Pilot Details</Header>
            <Segment>
              <PilotDetails pilot={currentPilot} />
            </Segment>
            <Segment>
              <PilotCommands />
            </Segment>
          </Grid.Column>
        </Grid>
      </Segment>
    )
  }
}

export default connect(mapStateToProps)(Pilots)
