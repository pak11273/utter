/* eslint no-unused-vars: 0 */

import {graphql} from "react-apollo"
import React, {PureComponent} from "react"
import gql from "graphql-tag"
import {normalizeErrors} from "../utils/normalizeErrors"

/* NOTE: Since this will file will be used by both client and app, it cannot use React or React Native Commands ie. <div> <View> */
export class D extends PureComponent {
  submit = async values => {
    try {
      const response = await this.props.mutate({
        variables: {
          identifier: values["username or email"],
          password: values.password
        }
      })
      console.log("respaone: ", response)
      const errors = response.data.login.error
      if (errors) {
        return normalizeErrors(errors)
      }
      return null
    } catch (err) {
      console.log("err: ", err)
    }
  }

  render() {
    return this.props.children({submit: this.submit})
  }
}

const loginMutation = gql`
  mutation($identifier: String!, $password: String!) {
    login(input: {identifier: $identifier, password: $password}) {
      token
      error {
        path
        message
      }
    }
  }
`

export const LoginConnector = graphql(loginMutation)(D)
