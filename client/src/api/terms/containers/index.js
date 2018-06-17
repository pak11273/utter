import React, {Component} from 'react'
import {connect} from 'react-redux'

import {Grid, Segment, Header} from 'semantic-ui-react'

import TermsList from '../components/termsList.js'
import TermDetails from './termDetails.js'

import {selectCurrentPilot} from '../selectors'

import orm from '../../../app/schema.js'

class Terms extends Component {
  render() {
    const {terms} = this.props
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
              <TermDetails term={currentTerm} />
            </Segment>
          </Grid.Column>
        </Grid>
      </Segment>
    )
  }
}

const mapStateToProps = state => {
  // create an orm session from entities slice
  const session = orm.session(state.entitiesReducer)
  // destructure the Term slice
  const {Term} = session
  // convert to array
  const terms = Term.all().toRefArray()
  // return the result
  return {terms}
}

export default connect(mapStateToProps)(Terms)
