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
    const {terms, onTermClicked, currentTerm} = this.props

    const termRows = terms.map(obj => (
      <TermsListRow
        term={obj}
        key={obj.id}
        onTermClicked={onTermClicked}
        selected={obj.id === currentTerm}
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

  const terms = Terms.all().toRefArray()

  const currentTerm = selectCurrentTerm(state)

  return {terms, currentTerm}
}

export default connect(mapStateToProps)(TermsList)
