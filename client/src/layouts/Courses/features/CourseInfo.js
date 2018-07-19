import React, {Component} from 'react'
import {connect} from 'react-redux'
import orm from '../../../app/schema.js'
import {Form, Dropdown, Segment} from 'semantic-ui-react'

const LANGUAGES = [
  // skip other entries
  {value: 'en', text: 'English'},
  {value: 'ko', text: 'Korean'}
]

class CoureInfo extends Component {
  constructor() {
    super()
  }
  render() {
    const {courseName} = this.props.course

    return (
      <Segment attached="bottom">
        <Form size="large">
          <Form.Field name="name" width={6}>
            <label>Course Name</label>
            <input placeholder="Name" defaultValue={courseName} />
          </Form.Field>
          <Form.Field name="affiliation" width={6}>
            <label>Languagaes</label>
            <Dropdown selection options={LANGUAGES} defaultValue="ko" />
          </Form.Field>
        </Form>
      </Segment>
    )
  }
}

const mapStateToProps = state => {
  const session = orm.session(state.entitiesReducer)
  const {Course} = session
  const courses = Course.all().toRefArray()
  const course = courses[0]
  return {course}
}

export default connect(mapStateToProps)(CoureInfo)
