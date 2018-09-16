import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Form, Dropdown, Grid, Button, Input} from 'semantic-ui-react'
import orm from '../../../app/schema.js'
import FormEditWrapper from '../../../components/FormEditWrapper'
import {getEntitiesSession} from '../../../api/entities/selectors.js'
import {selectCurrentLevel} from '../../../api/levels/selectors.js'
import {updateEntity} from '../../../api/entities/actions.js'
import {getValueFromEvent} from '../../../utils/clientUtils.js'

class LevelDetails extends Component {
  inputChange = e => {
    const newValues = getValueFromEvent(e)
    const {id} = this.props.entry

    this.props.updateEntity('Levels', id, newValues)
  }

  dropdownChange = (e, result) => {
    const {name, value} = result
    const newValues = {[name]: value}
    const {id} = this.props.course
    this.props.updateEntity('Levels', id, newValues)
  }

  render() {
    const {entry = {}, levelIsSelected = false} = this.props
    const {name = '', level = '', terms = {}} = entry
    const termsCount = Object.keys(terms).length
    return (
      <Form size="large">
        <FormEditWrapper
          singleValue={true}
          value={{name}}
          onChange={this.inputChange}>
          <Form.Field
            label="Name"
            name="name"
            width={16}
            control={Input}
            placeholder="Title"
          />
        </FormEditWrapper>
        <FormEditWrapper
          singleValue={true}
          value={{level}}
          onChange={this.inputChange}>
          <Form.Field
            label="Level"
            name="level"
            width={16}
            control={Input}
            placeholder="level"
          />
        </FormEditWrapper>
        <FormEditWrapper singleValue={true} value={{termsCount}}>
          <Form.Field
            label="Terms"
            name="terms"
            width={16}
            control={Input}
            placeholder="terms"
            readOnly
          />
        </FormEditWrapper>
        <Button style={{background: '#F6D155'}}>Save</Button>
      </Form>
    )
  }
}

const mapStateToProps = state => {
  let entry

  const currentLevel = selectCurrentLevel(state)

  const session = getEntitiesSession(state)

  const {Levels} = session

  if (Levels.hasId(currentLevel)) {
    entry = Levels.withId(currentLevel).ref
  } else {
    entry = {name: '', level: '', id: ''}
  }

  const levelIsSelected = Boolean(currentLevel)

  return {entry, levelIsSelected}
}

const actions = {
  updateEntity
}

export default connect(
  mapStateToProps,
  actions
)(LevelDetails)
