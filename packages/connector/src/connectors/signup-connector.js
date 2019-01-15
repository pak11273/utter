/* eslint no-unused-vars: 0 */

import React, {PureComponent} from "react"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import {graphql} from "react-apollo"
import gql from "graphql-tag"
import {normalizeErrors} from "../utils/normalize-errors"

// actions
import {loadData} from "../../../client/src/api/actions.js"

/* NOTE: Since this will file will be used by both client and app, it cannot use React or React Native Commands ie. <div> <View> */
export class C extends PureComponent {
  submit = async values => {
    try {
      const {
        data: {
          signup: {error}
        },
        data: {
          signup: {token}
        },
        data: {
          signup: {user}
        }
      } = await this.props.mutate({
        variables: {
          username: values.username,
          email: values.email,
          password: values.password,
          passwordConfirmation: values["password confirmation"],
          timezone: values.timezone
        }
      })

      if (token !== null) {
        this.props.loadData(user)
        return token
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

const signupMutation = gql`
  mutation signupMutation(
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
      user {
        id
        username
        email
        roles
        scopes
      }
      error {
        path
        message
      }
    }
  }
`

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      loadData
    },
    dispatch
  )
}

export const SignupConnector = connect(
  null,
  mapDispatchToProps
)(graphql(signupMutation)(C))
