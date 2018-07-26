import React, {Component} from 'react'
import {connect} from 'react-redux'
import orm from '../../../app/schema.js'

import {Grid, Segment, Header} from 'semantic-ui-react'

import TermsList from '../components/termsList.js'
import TermDetails from '../components/termDetails.js'

import {selectTerm} from '../../../api/terms/actions.js'

import {selectCurrentTerm} from '../../../api/terms/selectors.js'

const actions = {
  selectTerm
}

class Terms extends Component {
  render() {
    const {terms = [], selectTerm, currentTerm} = this.props
    const currentTermEntry = terms.find(term => term.id === currentTerm)
    return (
      <Segment>
        <Grid>
          <Grid.Column width={10}>
            <Header as="h3">Terms</Header>
            <TermsList
              terms={terms}
              onTermClicked={selectTerm}
              currentTerm={currentTerm}
            />
          </Grid.Column>
          <Grid.Column width={6}>
            <Header as="h3">Details</Header>
            <Segment>
              <TermDetails entry={currentTermEntry} />
            </Segment>
          </Grid.Column>
        </Grid>
      </Segment>
    )
  }
}

const mapStateToProps = state => {
  const session = orm.session(state.entitiesReducer)

  const {Terms} = session

  const terms = Terms.all()
    .toModelArray()
    .map(termModel => {
      const term = {
        ...termModel.ref
      }

      return term
    })

  const currentTerm = selectCurrentTerm(state)
  return {terms, currentTerm}
}

export default connect(mapStateToProps, actions)(Terms)
