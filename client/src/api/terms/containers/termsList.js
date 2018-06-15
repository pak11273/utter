import React, {Component} from 'react'
import {Table} from 'semantic-ui-react'

import TermsListHeader from './termsListHeader.js'
import TermsListRow from './termsListRow'

import {getEntitiesSession} from '../../../api/entities/selectors'

import {selectTerm} from '../actions'
import {selectCurrentTerm} from '../selectors'

export default class TermsList extends Component {
  render() {
    const {terms} = this.props

    const termRows = terms.map(term => (
      <TermsListRow term={term} key={term.name} />
    ))

    return (
      <Table celled>
        <TermsListHeader />
        <Table.Body>{termRows}</Table.Body>
      </Table>
    )
  }
}
