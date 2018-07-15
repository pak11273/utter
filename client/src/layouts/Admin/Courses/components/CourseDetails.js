import React from 'react'
import {Form} from 'semantic-ui-react'

import {getWeightClass} from '../selectors'

const CourseDetails = ({course = {}}) => {
  const {id = '', type = '', courseType = {}} = course

  const {name = '', weight = ''} = courseType

  const weightClass = getWeightClass(weight)

  return (
    <Form size="large">
      <Form.Field name="id" width={6}>
        <label>ID</label>
        <input placeholder="ID" defaultValue={id} />
      </Form.Field>
      <Form.Field name="name" width={16}>
        <label>Name</label>
        <input placeholder="Name" defaultValue={name} />
      </Form.Field>
      <Form.Field name="model" width={6}>
        <label>Model</label>
        <input placeholder="Model" defaultValue={type} />
      </Form.Field>
      <Form.Field name="weight" width={6}>
        <label>Weight</label>
        <input defaultValue={weight} />
      </Form.Field>
      <Form.Field name="class" width={6}>
        <label>Class</label>
        <input defaultValue={weightClass} />
      </Form.Field>
    </Form>
  )
}

export default CourseDetails
