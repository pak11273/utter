import React, {Component} from 'react'
import {Grid, Segment, Header} from 'semantic-ui-react'
import TermsList from '../containers/termsList.js'
import TermDetails from '../containers/termDetails.js'

export default () => (
  <Segment>
    <Grid>
      <Grid.Column width={10}>
        <Header as="h3">Terms</Header>
        <TermsList />
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
