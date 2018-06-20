import React, {Component} from 'react'
import {connect} from 'react-redux'
import orm from '../../../app/schema'
import {Form, Dropdown, Grid, Button} from 'semantic-ui-react'

import {getEntitiesSession} from '../../../api/entities/selectors.js'

import {getEditingEntitiesSession} from '../../../containers/Editing/selectors'

import {FormEditWrapper} from '../../../components'

import {selectCurrentLevel, selectIsEditingLevel} from '../selectors.js'
import {LEVEL_RANKS} from '../types.js'

import {
  startEditingLevel,
  stopEditingLevel,
  cancelEditinLevelg
} from '../actions.js'

import {resetEditedItem} from '../../../containers/Editing/actions.js'

import {editItemAttributes} from '../../../containers/Editing/actions'

import {getValueFromEvent} from '../../../utils/clientUtils.js'

const RANKS = LEVEL_RANKS.map(rank => ({value: rank, text: rank}))

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

const mapStateToProps = state => {
  let level

  const currentLevel = selectCurrentLevel(state)

  const session = orm.session(state.entitiesReducer)

  const {Level} = session

  if (Level.hasId(currentLevel)) {
    level = Level.withId(currentLevel).ref
  }
  return {level}
}

const actions = {
  startEditingLevel,
  stopEditingLevel,
  editItemAttributes,
  resetEditedItem,
  cancelEditinLevelg
}

export class LevelDetails extends Component {
  onInputChanged = e => {
    const newValues = getValueFromEvent(e)
    const {id} = this.propslevel.this.props.editItemAttributes(
      'Level',
      id,
      newValues
    )
  }

  onDropdownChanged = (e, result) => {
    const {name, value} = result
    const newValues = {[name]: value}
    const {id} = this.propslevel.this.props.editItemAttributes(
      'Level',
      id,
      newValues
    )
  }

  onStartEditingClicked = () => {
    this.props.startEditingLevel()
  }

  onStopEditingClicked = () => {
    this.props.stopEditingLevel()
  }

  onResetClicked = () => {
    const {id} = this.propslevel.this.props.resetEditedItem('Level', id)
  }

  render() {
    const {
      level = {},
      levelIsSelected = false,
      isEditingLevel = false
    } = this.props

    const {name = '', rank = ''} = level

    const canStartEditing = levelIsSelected && !isEditinLevelg
    const canStopEditing = levelIsSelected && isEditinLevelg

    const buttonWidth = 140

    return (
      <Form size="large">
        <FormEditWrapper
          singleValue={true}
          value={{name}}
          onChange={this.onInputChanged}
          passIsEditing={false}>
          <Form.Field
            name="rank"
            label="Rank"
            width={10}
            control={Dropdown}
            fluid
            selection
            options={RANKS}
            value={rank}
            onChange={this.onDropdownChanged}
            disabled={!canStopEditing}
          />
        </FormEditWrapper>
        <Form.Group>
          <Form.Field
            name="name"
            label="Name"
            width={16}
            placeholder="Name"
            disabled={!canStopEditing}
            control="input"
          />
        </Form.Group>
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
            onClick={this.props.cancelEditingLevel}>
            Cancel Edits
          </Button>
        </Grid.Row>
      </Form>
    )
  }
}

export default connect(mapStateToProps, actions)(LevelDetails)
