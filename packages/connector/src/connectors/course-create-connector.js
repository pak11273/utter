/* eslint no-unused-vars: 0 */

import React, {PureComponent} from "react"
import {graphql} from "react-apollo"
import gql from "graphql-tag"
import {normalizeErrors} from "../utils/normalizeErrors"

/* NOTE: Since this will file will be used by both client and app, it cannot use React or React Native Commands ie. <div> <View> */
export class CC extends PureComponent {
  submit = async values => {
    try {
      const {
        data: {
          courseCreate: {error}
        },
        data: {
          courseCreate: {course}
        }
      } = await this.props.mutate({
        variables: {
          id: values.id,
          courseId: values.courseId,
          courseName: values.courseName,
          description: values.description,
          courseMode: values.courseMode,
          favorite: values.favorite
        }
      })

      if (course !== null) {
        return course
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
  mutation CourseCreateMutation(
    $id: ID!
    $courseId: String
    $courseName: String!
    $description: String
    $courseMode: String
    $favorite: Boolean
  ) {
    courseCreate(
      input: {
        id: $id
        courseId: $courseId
        courseName: $courseName
        description: $description
        courseMode: $courseMode
        favorite: $favorite
      }
    ) {
      course
      error {
        path
        message
      }
    }
  }
`

export const CourseCreateConnector = graphql(CourseCreateMutation)(CC)
