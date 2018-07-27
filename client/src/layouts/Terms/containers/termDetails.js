import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Form, Dropdown, Grid, Button} from 'semantic-ui-react'
import orm from '../../../app/schema.js'
import {selectCurrentTerm} from '../../../api/terms/selectors.js'

const TermDetails = ({entry = {}}) => {
  const {word = '', level = '', id = '', translation = ''} = entry
  return (
    <Form size="large">
      <Form.Field name="level" width={16}>
        <label>Level</label>
        <input placeholder="Level" value={level} readOnly />
      </Form.Field>
      <Form.Field name="word" width={16}>
        <label>Word</label>
        <input placeholder="Word" value={word} readOnly />
      </Form.Field>
      <Form.Field name="translation" width={16}>
        <label>Translation</label>
        <input placeholder="Translation" value={translation} readOnly />
      </Form.Field>
      <Form.Group>
        <Form.Field
          name="translation"
          width={6}
          label="Translation"
          placeholder="Translation"
          control="input"
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Grid.Row width={16}>
          <Button primary type="button" />
          <Button secondary type="button" />
        </Grid.Row>
        <Grid.Row width={16}>
          <Button>Reset Values</Button>
          <Button negative type="button" />
        </Grid.Row>
      </Form.Group>
    </Form>
  )
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

export default connect(mapStateToProps)(TermDetails)
