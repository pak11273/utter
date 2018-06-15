import React from 'react'
import {Form, Dropdown, Segment} from 'semantic-ui-react'

const FACTIONS = [
  // skip other entries
  {value: 'en', text: 'English'},
  {value: 'ko', text: 'Korean'}
]

const Levels = () => {
  return (
    <Segment attached="bottom">
      <Form size="large">
        <Form.Field name="name" width={6}>
          <label>Levels</label>
          <input placeholder="Name" defaultValue="Utter Talk to me in Korean" />
        </Form.Field>
        <Form.Field name="affiliation" width={6}>
          <label>Languagaes</label>
          <Dropdown selection options={FACTIONS} defaultValue="ko" />
        </Form.Field>
      </Form>
    </Segment>
  )
}

export default Levels
