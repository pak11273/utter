import React, {Component} from 'react'

import {Grid, Segment, Header} from 'semantic-ui-react'

import LevelsList from '../containers/levelsList.js'
import LevelDetails from '../containers/levelDetails.js'

import {selectLevel} from '../../../api/levels/actions.js'
import {selectCurrentLevel} from '../../../api/levels/selectors.js'

export default class Levels extends Component {
  render() {
    return (
      <Segment>
        <Grid>
          <Grid.Column width={10}>
            <Header as="h3">Levels</Header>
            <LevelsList />
          </Grid.Column>
          <Grid.Column width={6}>
            <Header as="h3">Details</Header>
            <Segment>
              <LevelDetails />
            </Segment>
          </Grid.Column>
        </Grid>
      </Segment>
    )
  }
}
