import React, {Component} from 'react'

import {Grid, Segment, Header} from 'semantic-ui-react'

import LevelsList from '../components/levelsList.js'
import LevelDetails from '../components/levelDetails.js'
const levels = [
  {
    level: 1,
    name: 'alphabet'
  }
]

export default class Levels extends Component {
  state = {
    levels
  }
  render() {
    const {levels} = this.state
    const currentLevel = levels[0] || {}
    return (
      <Segment>
        <Grid>
          <Grid.Column width={10}>
            <Header as="h3">Levels</Header>
            <LevelsList levels={levels} />
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
