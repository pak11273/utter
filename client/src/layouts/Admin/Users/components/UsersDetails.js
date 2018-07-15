import React from 'react'
import {Form, Dropdown} from 'semantic-ui-react'

const UsersDetails = ({user = {}}) => {
  const {username = '', email = ''} = user

  return (
    <Form size="large">
      <Form.Field name="username" width={16}>
        <label>Name</label>
        <input placeholder="userName" defaultValue={username} />
      </Form.Field>
      <Form.Field name="email" width={16}>
        <label>Email</label>
        <input placeholder="email" defaultValue={email} />
      </Form.Field>
    </Form>
  )
}

export default UsersDetails
