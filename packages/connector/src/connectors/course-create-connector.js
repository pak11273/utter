/* eslint no-unused-vars: 0 */

import React, {PureComponent} from "react"
import {graphql} from "react-apollo"
import gql from "graphql-tag"
import {normalizeErrors} from "../utils/normalizeErrors"

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
          teachingLang: values.teachingLang
        }
      })

      if (courseCreate) {
        return courseCreate
      }
      if (error) {
        return normalizeErrors(error)
      }
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
  ) {
    courseCreate(
      input: {
        courseName: $courseName
        courseImage: $courseImage
        courseDescription: $courseDescription
        courseMode: $courseMode
        teachingLang: $teachingLang
      }
    ) {
      id
      courseName
      courseAuthor {
        username
      }
      courseDescription
      courseMode
    }
  }
`

export const CourseCreateConnector = graphql(CourseCreateMutation)(CC)
