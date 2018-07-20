import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Form, Dropdown, Grid, Button} from 'semantic-ui-react'

import {getEntitiesSession} from '../../../api/entities/selectors'
import {getEditingEntitiesSession} from '../../../containers/Editing/selectors.js'

import {FormEditWrapper} from '../../../components'

import {
  selectCurrentTerm,
  selectIsEditingTerm
} from '../../../api/terms/selectors'
import {TERM_RANKS} from '../../../api/terms/types.js'

import {
  startEditingTerm,
  stopEditingTerm,
  cancelEditingTerm
} from '../../../api/terms/actions.js'

import {resetEditedItem} from '../../../containers/Editing/actions.js'

import {editItemAttributes} from '../../../containers/Editing/actions.js'

import {getValueFromEvent} from '../../../utils/clientUtils'

const RANKS = TERM_RANKS.map(rank => ({value: rank, text: rank}))

const SKILL_VALUES = [
  {value: 0, text: 0},
  {value: 1, text: 1},
  {value: 2, text: 2},
  {value: 3, text: 3},
  {value: 4, text: 4},
  {value: 5, text: 5},
  {value: 6, text: 6},
  {value: 7, text: 7},
  {value: 8, text: 8}
]

const MECHS = [{value: 'WHM-6R', text: 'Warhammer WHM-6R'}]

const mapState = state => {
  let pilot

  const currentTerm = selectCurrentTerm(state)

  const pilotIsSelected = Boolean(currentTerm)
  const isEditingTerm = selectIsEditingTerm(state)

  if (pilotIsSelected) {
    const session = isEditingTerm
      ? getEditingEntitiesSession(state)
      : getEntitiesSession(state)

    const {Term} = session

    if (Term.hasId(currentTerm)) {
      pilot = Term.withId(currentTerm).ref
    }
  }
  return {pilot, pilotIsSelected, isEditingTerm}
}

const actions = {
  startEditingTerm,
  stopEditingTerm,
  editItemAttributes,
  resetEditedItem,
  cancelEditingTerm
}

export class TermDetails extends Component {
  onInputChanged = e => {
    const newValues = getValueFromEvent(e)
    const {id} = this.props.pilot

    this.props.editItemAttributes('Term', id, newValues)
  }

  onDropdownChanged = (e, result) => {
    const {name, value} = result
    const newValues = {[name]: value}
    const {id} = this.props.pilot

    this.props.editItemAttributes('Term', id, newValues)
  }
  onStartEditingClicked = () => {
    this.props.startEditingTerm()
  }

  onStopEditingClicked = () => {
    this.props.stopEditingTerm()
  }

  onResetClicked = () => {
    const {id} = this.props.pilot
    this.props.resetEditedItem('Term', id)
  }

  render() {
    const {
      pilot = {},
      pilotIsSelected = false,
      isEditingTerm = false
    } = this.props

    const {
      name = '',
      rank = '',
      translation = '',
      gunnery = '',
      piloting = '',
      mechType = ''
    } = pilot

    const canStartEditing = pilotIsSelected && !isEditingTerm
    const canStopEditing = pilotIsSelected && isEditingTerm

    const buttonWidth = 140

    return (
      <Form size="large">
        <FormEditWrapper
          singleValue={true}
          value={{name}}
          onChange={this.onInputChanged}
          passIsEditing={false}>
          <Form.Field
            name="name"
            label="Name"
            width={16}
            placeholder="Name"
            disabled={!canStopEditing}
            control="input"
          />
        </FormEditWrapper>
        <Form.Group>
          <Form.Field
            name="level"
            label="Level"
            width={2}
            control={Dropdown}
            fluid
            selection
            options={RANKS}
            value={rank}
            onChange={this.onDropdownChanged}
            disabled={!canStopEditing}
          />
          <FormEditWrapper
            singleValue={true}
            value={{translation}}
            onChange={this.onInputChanged}
            passIsEditing={false}>
            <Form.Field
              name="translation"
              width={6}
              label="Translation"
              placeholder="Translation"
              control="input"
              disabled={!canStopEditing}
            />
          </FormEditWrapper>
          <Form.Field
            name="audio"
            label="Audio"
            width={2}
            control={Dropdown}
            fluid
            selection
            options={RANKS}
            value={rank}
            onChange={this.onDropdownChanged}
            disabled={!canStopEditing}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Grid.Row width={16}>
            <Button
              primary
              disabled={!canStartEditing}
              type="button"
              onClick={this.onStartEditingClicked}
              style={{width: buttonWidth, marginRight: 10}}>
              Start Editing
            </Button>
            <Button
              secondary
              disabled={!canStopEditing}
              type="button"
              style={{width: buttonWidth}}
              onClick={this.onStopEditingClicked}>
              Save Edits
            </Button>
          </Grid.Row>
          <Grid.Row width={16}>
            <Button
              disabled={!canStopEditing}
              type="button"
              onClick={this.onResetClicked}
              style={{width: buttonWidth, marginRight: 10}}>
              Reset Values
            </Button>
            <Button
              negative
              disabled={!canStopEditing}
              type="button"
              style={{width: buttonWidth}}
              onClick={this.props.cancelEditingTerm}>
              Cancel Edits
            </Button>
          </Grid.Row>
        </Form.Group>
      </Form>
    )
  }
}

export default connect(mapState, actions)(TermDetails)
