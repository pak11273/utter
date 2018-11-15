/* eslint no-unused-vars: 0 */

import React, {PureComponent} from "react"
import {graphql} from "react-apollo"
import gql from "graphql-tag"

/* NOTE: This file cannot use React or React Native Commands ie. <div> <View> */
export class C extends PureComponent {
  submit = async values => {
    console.log("values: ", values)
    const response = await this.props.mutate({
      variables: values
    })
    console.log("response: ", response)
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
  ) {
    signup(
      input: {
        username: $username
        email: $email
        password: $password
        passwordConfirmation: $passwordConfirmation
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
