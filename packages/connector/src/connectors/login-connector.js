/* eslint no-unused-vars: 0 */

import {graphql} from "react-apollo"
import React, {Component} from "react"
import gql from "graphql-tag"
import {normalizeErrors} from "../utils/normalize-errors"
import isEmpty from "lodash/isEmpty"
import {local} from "brownies"

/* NOTE: Since this will file will be used by both client and app, it cannot use React or React Native Commands ie. <div> <View> */
export class D extends Component {
  submit = async values => {
    try {
      const response = await this.props.mutate({
        variables: {
          identifier: values["username or email"],
          password: values.password
        }
      })
      const error = response.data.login.error
      const token = response.data.login.token
      if (!isEmpty(error)) {
        return normalizeErrors(error)
      }
      return {
        ...response.data.login,
        token,
        error
      }
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
      user {
        _id
        username
        email
        roles
        scopes
        subscriptions {
          _id
          title
          levels {
            level
          }
        }
      }
      error {
        path
        message
      }
    }
  }
`

export const LoginConnector = graphql(loginMutation)(D)
