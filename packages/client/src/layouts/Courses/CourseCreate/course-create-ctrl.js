import React, {PureComponent} from "react"
import {CourseCreateConnector} from "@utterzone/connector"

import CourseCreateView from "./course-create-view"

export default class SignupCtrl extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <CourseCreateConnector>
          {({submit}) => <CourseCreateView submit={submit} />}
        </CourseCreateConnector>
      </React.Fragment>
    )
  }
}
