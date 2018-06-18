import React, {Component} from 'react'
import {connect} from 'react-redux'
import orm from '../../../../app/schema.js'

import {Grid, Segment, Header} from 'semantic-ui-react'

import MechsList from './MechsList'
import MechDetails from './MechDetails'

import {selectMech} from './actions.js'
import {selectCurrentMech} from './selectors.js'

const mapStateToProps = state => {
  const session = orm.session(state.entitiesReducer)
  const {Mech} = session

  const mechs = Mech.all()
    .toModelArray()
    .map(mechModel => {
      const mech = {
        ...mechModel.ref,
        mechType: {}
      }

      if (mechModel.type) {
        mech.mechType = {...mechModel.type.ref}
      }

      return mech
    })

  const currentMech = selectCurrentMech(state)
  return {mechs, currentMech}
}

const actions = {
  selectMech
}

class Mechs extends Component {
  render() {
    const {mechs = [], selectMech, currentMech} = this.props

    const currentMechEntry = mechs.find(mech => mech.id === currentMech) || {}
    console.log('currentMechEntry: ', currentMechEntry)

    return (
      <Segment>
        <Grid>
          <Grid.Column width={10}>
            <Header as="h3">Mechs List</Header>
            <MechsList
              mechs={mechs}
              onMechClicked={selectMech}
              currentMech={currentMech}
            />
          </Grid.Column>
          <Grid.Column width={6}>
            <Header as="h3">Mech Details</Header>
            <Segment>
              <MechDetails mech={currentMechEntry} />
            </Segment>
          </Grid.Column>
        </Grid>
      </Segment>
    )
  }
}

export default connect(mapStateToProps, actions)(Mechs)
