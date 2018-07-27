import React from 'react'
import {connect} from 'react-redux'
import _ from 'lodash'
import {Table} from 'semantic-ui-react'
import orm from '../../../app/schema.js'

const TermsListRow = ({entry = {}, onTermClicked = _.noop, selected}) => {
  const {id = null, word = '', level = '', translation = '', audio = ''} = entry
  return (
    <Table.Row onClick={() => onTermClicked(id)} active={selected}>
      <Table.Cell>{level}</Table.Cell>
      <Table.Cell>{word}</Table.Cell>
      <Table.Cell>{translation}</Table.Cell>
      <Table.Cell>{audio}</Table.Cell>
    </Table.Row>
  )
}

const mapStateToProps = (state, ownProps) => {
  const session = orm.session(state.entitiesReducer)

  const {Terms} = session

  let entry

  if (Terms.hasId(ownProps.term.id)) {
    const termModel = Terms.withId(ownProps.term.id)
    entry = {
      ...termModel.ref
    }
  }
  return {entry}
}

export default connect(mapStateToProps)(TermsListRow)
