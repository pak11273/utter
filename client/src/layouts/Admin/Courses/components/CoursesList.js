import React, {Component} from 'react'
import {Table} from 'semantic-ui-react'

import CoursesListHeader from '../components/CoursesListHeader'
import CoursesListRow from '../components/CoursesListRow'

export default class CoursesList extends Component {
  render() {
    const {courses = []} = this.props
    console.log('courses: ', courses)

    const courseRows = courses.map((course, i) => (
      <CoursesListRow course={course} key={i} />
    ))

    return (
      <Table celled>
        <CoursesListHeader />
        <Table.Body>{courseRows}</Table.Body>
      </Table>
    )
  }
}
