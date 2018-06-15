import React, {Component} from 'react'

import {Grid, Segment, Header} from 'semantic-ui-react'

import TermsList from './termsList.js'
import TermDetails from './termDetails.js'
const terms = [
  {
    level: 1,
    name: 'head',
    translation: '머리',
    audio: 'head.mp3'
  }
]

export default class Terms extends Component {
  state = {
    terms
  }
  render() {
    const {terms} = this.state
    const currentTerm = terms[0] || {}
    return (
      <Segment>
        <Grid>
          <Grid.Column width={10}>
            <Header as="h3">Terms</Header>
            <TermsList terms={terms} />
          </Grid.Column>
          <Grid.Column width={6}>
            <Header as="h3">Details</Header>
            <Segment>
              <TermDetails />
            </Segment>
          </Grid.Column>
        </Grid>
      </Segment>
    )
  }
}
