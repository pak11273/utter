/* eslint no-unused-vars: 0 */

import React, {PureComponent} from "react"
import {connect} from "react-redux"
import schema from "../../../client/src/core/schema"
import {loadData} from "../../../client/src/api/actions.js"
import {graphql} from "react-apollo"
import gql from "graphql-tag"
import {normalizeErrors} from "../utils/normalize-errors"

/* NOTE: Since this will file will be used by both client and app, it cannot use React or React Native Commands ie. <div> <View> */
export class CC extends PureComponent {
  submit = async values => {
    try {
      const {data: courseCreate} = await this.props.mutate({
        variables: {
          courseName: values.courseName,
          courseDescription: values.courseDescription,
          courseImage: values.courseImage,
          courseMode: values.courseMode,
          teachingLang: values.teachingLang,
          usingLang: values.usingLang
        }
      })

      if (courseCreate) {
        courseCreate.course = courseCreate.courseCreate
        delete courseCreate.courseCreate

        this.props.loadData(courseCreate)
      }

      return courseCreate
    } catch (err) {
      console.log("err: ", err)
    }
    return null
  }

  render() {
    return this.props.children({submit: this.submit})
  }
}

const CourseCreateMutation = gql`
  mutation courseCreate(
    $courseName: String!
    $courseImage: String
    $courseDescription: String
    $courseMode: String
    $teachingLang: String
    $usingLang: String
  ) {
    courseCreate(
      input: {
        courseName: $courseName
        courseImage: $courseImage
        courseDescription: $courseDescription
        courseMode: $courseMode
        teachingLang: $teachingLang
        usingLang: $usingLang
      }
    ) {
      id
      courseName
      owner {
        username
      }
      courseDescription
      courseMode
    }
  }
`

/* const mapStateToProps = state => { */
/*   const session = schema.session(state.apiReducer) */
/*   const {Course} = session */
/*   const course = Course.first().ref */
/*   return { */
/*     course */
/*   } */
/* } */

const mapDispatchToProps = dispatch => {
  return {
    loadData: payload => dispatch(loadData(payload))
  }
}

export const CourseCreateConnector = connect(
  null,
  mapDispatchToProps
)(graphql(CourseCreateMutation)(CC))
