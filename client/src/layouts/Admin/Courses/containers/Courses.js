import React, {Component} from 'react'
import {connect} from 'react-redux'

import {Grid, Segment, Header} from 'semantic-ui-react'

import orm from '../../../../app/schema.js'

import CoursesList from '../components/CoursesList'
import CourseDetails from '../components/CourseDetails'

const mapStateToProps = state => {
  const session = orm.session(state.entities)
  const {Courses} = session
  let courses = Courses.all()
    .toModelArray()
    .map(courseModel => {
      const courses = {
        // Copy the data from the plain JS object
        ...courseModel.ref,
        // Provide a default empty object for the relation
        courseType: {}
      }

      if (courseModel.type) {
        // Replace the default object with a copy of the relation's data
        courses.courseType = {...courseModel.type.ref}
      }
      return courses
    })
  courses = [{name: 'hi'}]
  return {courses}
}

class Courses extends Component {
  componentDidMount() {
    // load courses from db
  }

  render() {
    const {courses = []} = this.props

    const currentCourse = courses[0] || {}

    return (
      <Segment>
        <Grid>
          <Grid.Column width={10}>
            <Header as="h3">Courses List</Header>
            <CoursesList courses={courses} />
          </Grid.Column>
          <Grid.Column width={6}>
            <Header as="h3">Course Details</Header>
            <Segment>
              <CourseDetails course={currentCourse} />
            </Segment>
          </Grid.Column>
        </Grid>
      </Segment>
    )
  }
}

export default connect(mapStateToProps)(Courses)
