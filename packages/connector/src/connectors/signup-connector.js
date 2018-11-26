/* eslint no-unused-vars: 0 */

import {graphql} from "react-apollo"
import React, {PureComponent} from "react"
import gql from "graphql-tag"
import {normalizeErrors} from "../utils/normalizeErrors"

/* NOTE: This file cannot use React or React Native Commands ie. <div> <View> */
export class C extends PureComponent {
  submit = async values => {
    try {
      const {
        data: {
          signup: {error}
        },
        data: {
          signup: {token}
        }
      } = await this.props.mutate({
        variables: values
      })

      if (token) {
        return token
      } else if (error) {
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

const signupMutation = gql`
  mutation(
    $username: String!
    $email: String!
    $password: String!
    $passwordConfirmation: String!
    $timezone: String
  ) {
    signup(
      input: {
        username: $username
        email: $email
        password: $password
        passwordConfirmation: $passwordConfirmation
        timezone: $timezone
      }
    ) {
      token
      error {
        path
        message
      }
    }
  }
`

export const SignupConnector = graphql(signupMutation)(C)
