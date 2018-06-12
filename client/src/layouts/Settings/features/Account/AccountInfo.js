import React from 'react'
import {Form, Dropdown, Segment} from 'semantic-ui-react'

const FACTIONS = [
  // skip other entries
  {value: 'en', text: 'English'},
  {value: 'ko', text: 'Korean'}
]

const AccountInfo = () => {
  return (
    <Segment attached="bottom">
      <Form size="large">
        <Form.Field name="name" width={6}>
          <label>Username</label>
          <input placeholder="Name" defaultValue="my name" />
        </Form.Field>
        <Form.Field name="email" width={6}>
          <label>Email</label>
          <input placeholder="Email" defaultValue="my email" />
        </Form.Field>
      </Form>
    </Segment>
  )
}

export default AccountInfo
