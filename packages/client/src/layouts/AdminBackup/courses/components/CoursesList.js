import React, {Component} from "react"
import {Table} from "semantic-ui-react"

import CoursesListHeader from "./CoursesListHeader"
import CoursesListRow from "./CoursesListRow"

export default class CoursesList extends Component {
  render() {
    const {courses = []} = this.props

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
