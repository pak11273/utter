import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Dropdown, Form, Grid, Image, Segment} from 'semantic-ui-react'
import orm from '../../../app/schema.js'

const USING_LANG = [
  {value: 'English', text: 'English'},
  {value: 'Korean', text: 'Korean'}
]

const TEACHING_LANG = [
  {value: 'English', text: 'English'},
  {value: 'Korean', text: 'Korean'}
]

// import {selectUserInfo} from '../../../../api/course/selectors.js'

class CourseSettings extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    // const {unitInfo} = this.props
    // const {name, affiliation} = unitInfo

    let course = this.props.course
    return (
      <Form size="large">
        <Segment>
          <Grid>
            <Grid.Column width={8}>
              <Form.Field name="image">
                <label>Course Thumbnail</label>
                <Image src={course.image} size="small" />
              </Form.Field>
              <Form.Field name="name">
                <label>Course Name</label>
                <input
                  placeholder="Name"
                  defaultValue={course.courseName}
                  disabled
                />
              </Form.Field>
              <Form.Field name="courseDescription">
                <label>Course Description</label>
                <textarea
                  placeholder="This section will describe this course."
                  defaultValue={course.courseDescription}
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column width={8}>
              <Segment>
                <Form.Field name="usingLanguage">
                  <label>Using Language</label>
                  <Dropdown
                    selection
                    options={USING_LANG}
                    defaultValue={course.usingLang}
                  />
                </Form.Field>
                <Form.Field name="teachingLanguage">
                  <label>Teaching Language</label>
                  <Dropdown
                    selection
                    options={TEACHING_LANG}
                    defaultValue={course.teachingLang}
                  />
                </Form.Field>
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

  let course = Course.first()

  // Now that we have an array of all pilot objects, return it as a prop
  // return {users}
  return {course}
}

export default connect(mapStateToProps)(CourseSettings)
