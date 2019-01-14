import React from 'react'
import {connect} from 'react-redux'
import _ from 'lodash'
import {Button, Icon, Table} from 'semantic-ui-react'
import orm from '../../../app/schema.js'
import {deleteEntity} from '../../../api/entities/actions.js'

const TermsListRow = ({
  entry = {},
  onTermClicked = _.noop,
  selected,
  deleteEntity
}) => {
  const {id = null, word = '', level = '', translation = '', audio = ''} = entry

  const onDeleteClicked = e => {
    e.stopPropagation()
    e.preventDefault()
    deleteEntity('Terms', id)
  }

  const onRowClicked = () => onTermClicked(id)

  return (
    <Table.Row onClick={onRowClicked} active={selected}>
      <Table.Cell>{level}</Table.Cell>
      <Table.Cell>{word}</Table.Cell>
      <Table.Cell>{translation}</Table.Cell>
      <Table.Cell>{audio}</Table.Cell>
      <Table.Cell>
        <Button
          compact
          basic
          circular
          size="tiny"
          color="red"
          icon={<Icon name="delete" />}
          onClick={onDeleteClicked}
        />
      </Table.Cell>
    </Table.Row>
  )
}

const mapStateToProps = (state, ownProps) => {
  const session = orm.session(state.apiReducer)

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

const actions = {
  deleteEntity
}

export default connect(mapStateToProps, actions)(TermsListRow)
