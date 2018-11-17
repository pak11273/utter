import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Table} from 'semantic-ui-react'
import orm from '../../../app/schema.js'

import TermsListHeader from '../components/termsListHeader.js'
import TermsListRow from './termsListRow'

import {getEntitiesSession} from '../../../api/entities/selectors'

import {selectTerm} from '../../../api/terms/actions'
import {selectCurrentTerm} from '../../../api/terms/selectors'

class TermsList extends Component {
  render() {
    const {terms = [], selectTerm, currentTerm} = this.props

    const termRows = terms.map(term => (
      <TermsListRow
        term={term}
        key={term.id}
        onTermClicked={selectTerm}
        selected={term.id === currentTerm}
      />
    ))

    return (
      <Table celled>
        <TermsListHeader />
        <Table.Body>{termRows}</Table.Body>
      </Table>
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

const actions = {
  selectTerm
}

export default connect(mapStateToProps, actions)(TermsList)
