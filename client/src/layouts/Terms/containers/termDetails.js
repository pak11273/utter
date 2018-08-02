import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Form, Dropdown, Grid, Input, Button, Segment} from 'semantic-ui-react'
import orm from '../../../app/schema.js'
import {selectCurrentTerm} from '../../../api/terms/selectors.js'
import FormEditWrapper from '../../../components/FormEditWrapper'
import {getEntitiesSession} from '../../../api/entities/selectors.js'

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
        <Form.Field
          label="Level"
          name="level"
          width={16}
          control={Input}
          placeholder="Level"
          value={level}
          readOnly
        />
        <FormEditWrapper
          singleValue={true}
          value={{word}}
          onChange={this.inputChange}>
          <Form.Field
            label="Word"
            name="word"
            width={16}
            control={Input}
            placeholder="Word"
          />
        </FormEditWrapper>
        <FormEditWrapper
          singleValue={true}
          value={{translation}}
          onChange={this.inputChange}>
          <Form.Field
            label="Translation"
            name="translation"
            width={16}
            control={Input}
            placeholder="Translation"
          />
        </FormEditWrapper>
        <Segment>
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
        </Segment>
        <Button style={{background: '#F6D155'}}>Save</Button>
      </Form>
    )
  }
}

const mapStateToProps = state => {
  let entry

  const currentTerm = selectCurrentTerm(state)

  const session = getEntitiesSession(state)

  const {Terms} = session

  if (Terms.hasId(currentTerm)) {
    entry = Terms.withId(currentTerm).ref
  } else {
    entry = {word: '', level: '', id: '', translation: ''}
  }

  const termIsSelected = Boolean(currentTerm)

  return {entry, termIsSelected}
}

const actions = {
  updateEntity
}

export default connect(mapStateToProps, actions)(TermDetails)
