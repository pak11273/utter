/* eslint no-unused-vars: 0 */

import {graphql} from "react-apollo"
import React, {PureComponent} from "react"
import gql from "graphql-tag"
import {normalizeErrors} from "../utils/normalizeErrors"
import isEmpty from "lodash/isEmpty"
/* import history from "../index.js" */

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
      const errors = response.data.login.error
      const token = response.data.login.token
      if (!isEmpty(errors)) {
        return normalizeErrors(errors)
      }
      if (token) {
        localStorage.setItem("AUTH_TOKEN", token)
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
  mutation loginMutation($identifier: String!, $password: String!) {
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
