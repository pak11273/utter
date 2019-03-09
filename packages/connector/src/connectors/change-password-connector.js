/* eslint no-unused-vars: 0 */

import {graphql} from "react-apollo"
import React, {PureComponent} from "react"
import gql from "graphql-tag"
import {normalizeErrors} from "../utils/normalize-errors.js"
import isEmpty from "lodash/isEmpty"
import {local} from "brownies"
/* import history from "../index.js" */

/* NOTE: Since this will file will be used by both client and app, it cannot use React or React Native Commands ie. <div> <View> */
export class N extends PureComponent {
  submit = async values => {
    try {
      const data = await this.props.mutate({
        variables: {
          password: values.password,
          passwordConfirmation: values["password confirmation"],
          token: values.token
        }
      })
      const token = data.data.changePassword.token
      if (token) {
        local.AUTH_TOKEN = token
      }
      return data
    } catch (err) {
      return err
    }
  }

  render() {
    return this.props.children({submit: this.submit})
  }
}

const changePasswordMutation = gql`
  mutation changePasswordMutation(
    $password: String!
    $passwordConfirmation: String
    $token: String!
  ) {
    changePassword(
      input: {
        password: $password
        passwordConfirmation: $passwordConfirmation
        token: $token
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
export const ChangePasswordConnector = graphql(changePasswordMutation)(N)
