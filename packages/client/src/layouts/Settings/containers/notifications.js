import React from 'react'
import {Form, Dropdown, Segment} from 'semantic-ui-react'

const FACTIONS = [
  // skip other entries
  {value: 'en', text: 'English'},
  {value: 'ko', text: 'Korean'}
]

const Notification = () => {
  return (
    <Segment attached="bottom">
      <Form size="large">
        <Form.Field name="name" width={6}>
          <label>Pending</label>
          <input placeholder="Pending" defaultValue="pending" />
        </Form.Field>
        <Form.Field name="email" width={6}>
          <label>Pending</label>
          <input placeholder="Pending" defaultValue="pending" />
        </Form.Field>
      </Form>
    </Segment>
  )
}

export default Notification
