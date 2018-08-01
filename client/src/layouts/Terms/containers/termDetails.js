import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Form, Dropdown, Grid, Input, Button} from 'semantic-ui-react'
import orm from '../../../app/schema.js'
import {selectCurrentTerm} from '../../../api/terms/selectors.js'

//actions
import {updateEntity} from '../../../api/entities/actions.js'
import {getValueFromEvent} from '../../../utils/clientUtils.js'

class TermDetails extends Component {
  inputChange = (e, result) => {
    const newValues = getValueFromEvent(e)
    const {id} = this.props.entry
    this.props.updateEntity('Terms', id, newValues)
  }

  dropdownChange = (e, result) => {
    const {name, value} = result
    const newValues = {[name]: value}
    const {id} = this.props.entry
    this.props.updateEntity('Terms', id, newValues)
  }
  render() {
    const {word = '', level = '', id = '', translation = ''} = this.props.entry
    return (
      <Form size="large">
        <label>Level</label>
        <Form.Field
          name="level"
          width={16}
          control={Input}
          placeholder="Level"
          value={level}
          readOnly
        />
        <label>Word</label>
        <Form.Field
          name="word"
          width={16}
          control={Input}
          placeholder="Word"
          value={word}
          onChange={this.inputChange}
        />
        <label>Translation</label>
        <Form.Field
          name="translation"
          width={16}
          control={Input}
          placeholder="Translation"
          value={translation}
          onChange={this.inputChange}
        />
        <Form.Group widths="equal">
          <Form.Field
            name="audio"
            width={6}
            label="audio"
            placeholder=".mp3"
            control="Input"
            readOnly
          />
          <Button>Upload</Button>
          <Button>Record</Button>
        </Form.Group>
      </Form>
    )
  }
}

const mapStateToProps = state => {
  let entry

  const currentTerm = selectCurrentTerm(state)

  const session = orm.session(state.entitiesReducer)

  const {Terms} = session

  if (Terms.hasId(currentTerm)) {
    entry = Terms.withId(currentTerm).ref
  }

  return {entry}
}

const actions = {
  updateEntity
}

export default connect(mapStateToProps, actions)(TermDetails)
