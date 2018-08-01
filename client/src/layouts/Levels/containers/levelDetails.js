import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Form, Dropdown, Grid, Button, Input} from 'semantic-ui-react'
import orm from '../../../app/schema.js'
import {selectCurrentLevel} from '../../../api/levels/selectors.js'
import {updateEntity} from '../../../api/entities/actions.js'
import {getValueFromEvent} from '../../../utils/clientUtils.js'

class LevelDetails extends Component {
  onNameChanged = e => {
    const newValues = getValueFromEvent(e)
    const {id} = this.props.entry

    this.props.updateEntity('Levels', id, newValues)
  }
  render() {
    const {entry = {}, levelIsSelected = false} = this.props
    const {title = '', level = '', id = ''} = entry
    return (
      <Form size="large">
        <label>Name</label>
        <Form.Field
          name="title"
          width={16}
          control={Input}
          placeholder="Title"
          value={title}
          onChange={this.onNameChanged}
        />
        <label>Level</label>
        <Form.Field
          name="rank"
          width={16}
          control={Input}
          placeholder="Name"
          value={level}
          readOnly
        />
        <label>Level ID</label>
        <Form.Field
          name="rank"
          width={16}
          control={Input}
          placeholder="id"
          value={id}
          readOnly
        />
      </Form>
    )
  }
}

const mapStateToProps = state => {
  let entry

  const currentLevel = selectCurrentLevel(state)

  const session = orm.session(state.entitiesReducer)

  const {Levels} = session

  if (Levels.hasId(currentLevel)) {
    entry = Levels.withId(currentLevel).ref
  } else {
    entry = {title: '', level: '', id: ''}
  }

  const levelIsSelected = Boolean(currentLevel)

  return {entry, levelIsSelected}
}

const actions = {
  updateEntity
}

export default connect(mapStateToProps, actions)(LevelDetails)
