import React, {Component} from 'react'
import {connect} from 'react-redux'
import orm from '../../../app/schema.js'

import {Grid, Segment, Header} from 'semantic-ui-react'

import LevelsList from '../components/levelsList.js'
import LevelDetails from '../components/levelDetails.js'

import {selectLevel} from '../actions.js'
import {selectCurrentLevel} from '../selectors.js'

const mapStateToProps = state => {
  const session = orm.session(state.entitiesReducer)

  const {Level} = session

  const levels = Level.all()
    .toModelArray()
    .map(levelModel => {
      const level = {
        ...levelModel.ref
      }

      return level
    })

  const currentLevel = selectCurrentLevel(state)

  return {levels, currentLevel}
}

const actions = {
  selectLevel
}

class Levels extends Component {
  render() {
    const {levels, selectLevel, currentLevel} = this.props
    const currentLevelEntry = levels.find(level => level.id === currentLevel)
    return (
      <Segment>
        <Grid>
          <Grid.Column width={10}>
            <Header as="h3">Levels</Header>
            <LevelsList levels={levels} onLevelClicked={selectLevel} />
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

export default connect(mapStateToProps, actions)(Levels)
