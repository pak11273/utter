import React, {Component} from 'react'
import {Table} from 'semantic-ui-react'

import TermsListHeader from './termsListHeader.js'
import TermsListRow from './termsListRow'

import {getEntitiesSession} from '../../../api/entities/selectors'

import {selectTerm} from '../../../api/terms/actions'
import {selectCurrentTerm} from '../../../api/terms/selectors'

export default class TermsList extends Component {
  render() {
    const {terms} = this.props
    const termRows = terms.map(obj => <TermsListRow term={obj} key={obj.id} />)

    return (
      <Table celled>
        <TermsListHeader />
        <Table.Body>{termRows}</Table.Body>
      </Table>
    )
  }
}
