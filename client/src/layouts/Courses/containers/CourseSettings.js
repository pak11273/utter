import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  Dropdown,
  Form,
  Grid,
  Image,
  Input,
  Segment,
  TextArea
} from 'semantic-ui-react'
import FormEditWrapper from '../../../components/FormEditWrapper'
import {updateEntity} from '../../../api/entities/actions.js'
import {getValueFromEvent} from '../../../utils/clientUtils.js'
import orm from '../../../app/schema.js'

const USING_LANG = [
  {value: 'English', text: 'English'},
  {value: 'Korean', text: 'Korean'}
]

const TEACHING_LANG = [
  {value: 'English', text: 'English'},
  {value: 'Korean', text: 'Korean'}
]

class CourseSettings extends Component {
  constructor(props) {
    super(props)
  }

  inputChange = (e, result) => {
    const newValues = getValueFromEvent(e)
    const {id} = this.props.course
    this.props.updateEntity('Course', id, newValues)
  }

  dropdownChange = (e, result) => {
    const {name, value} = result
    const newValues = {[name]: value}
    const {id} = this.props.course
    this.props.updateEntity('Course', id, newValues)
  }

  render() {
    let course = this.props.course
    const {courseDescription} = course
    return (
      <Form size="large">
        <Segment>
          <Grid>
            <Grid.Column width={8}>
              <label>Course Thumbnail</label>
              <Form.Field
                name="image"
                control={Image}
                src={course.image}
                size="small"
              />
              <Form.Field
                label="Course Name"
                name="name"
                control={Input}
                placeholder="Name"
                defaultValue={course.courseName}
                disabled
              />
              <FormEditWrapper
                singleValue={true}
                value={{courseDescription}}
                onChange={this.inputChange}>
                <Form.Field
                  label="Course Description"
                  name="courseDescription"
                  control={TextArea}
                  placeholder="This section will describe this course."
                />
              </FormEditWrapper>
            </Grid.Column>
            <Grid.Column width={8}>
              <Segment>
                <label>Using Language</label>
                <Form.Field
                  name="usingLang"
                  control={Dropdown}
                  selection
                  options={USING_LANG}
                  value={course.usingLang}
                  onChange={this.dropdownChange}
                />
                <label>Teaching Language</label>
                <Form.Field
                  name="teachingLang"
                  control={Dropdown}
                  selection
                  options={TEACHING_LANG}
                  value={course.teachingLang}
                  onChange={this.dropdownChange}
                />
              </Segment>
            </Grid.Column>
          </Grid>
        </Segment>
      </Form>
    )
  }
}

const mapStateToProps = state => {
  // Create a Redux-ORM Session from our "entities" slice, which
  // contains the "tables" for each model type
  const session = orm.session(state.entitiesReducer)

  // Retrieve the model class that we need.  Each Session
  // specifically "binds" model classes to itself, so that
  // updates to model instances are applied to that session.
  // These "bound classes" are available as fields in the sesssion.
  const {Course} = session

  // Query the session for all Course instances.
  // The QuerySet that is returned from all() can be used to
  // retrieve instances of the Course class, or retrieve the
  // plain JS objects that are actually in the store.
  // The toRefArray() method will give us an array of the
  // plain JS objects for each item in the QuerySet.

  let course = Course.first().ref

  // Now that we have an array of all pilot objects, return it as a prop
  // return {users}
  return {course}
}

const actions = {
  updateEntity
}

export default connect(mapStateToProps, actions)(CourseSettings)
