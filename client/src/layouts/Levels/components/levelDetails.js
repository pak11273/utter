import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Form, Dropdown, Grid, Button} from 'semantic-ui-react'

const LevelDetails = ({entry = {}}) => {
  const {title = '', level = '', id = ''} = entry
  return (
    <Form size="large">
      <Form.Field name="title" width={16}>
        <label>Name</label>
        <input placeholder="Name" value={title} readOnly />
      </Form.Field>
      <Form.Field name="rank" width={16}>
        <label>Level</label>
        <input placeholder="Name" value={level} readOnly />
      </Form.Field>
      <Form.Field name="rank" width={16}>
        <label>Level ID</label>
        <input placeholder="id" value={id} readOnly />
      </Form.Field>
    </Form>
  )
}

export default LevelDetails
