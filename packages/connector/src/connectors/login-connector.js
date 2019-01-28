/* eslint no-unused-vars: 0 */

import {compose, graphql} from "react-apollo"
import React, {Component} from "react"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import gql from "graphql-tag"
import {normalizeErrors} from "../utils/normalize-errors"
import {isEmpty} from "lodash"
/* import history from "../index.js" */

// actions
import {loadData} from "../../../client/src/api/actions.js"

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
      const errors = response.data.login.error
      const token = response.data.login.token
      if (!isEmpty(errors)) {
        return normalizeErrors(errors)
      }
      if (token) {
        localStorage.setItem("AUTH_TOKEN", token)
        const payload = {}
        payload.user = response.data.login.user
        this.props.loadData(payload)
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

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      loadData
    },
    dispatch
  )
}

const loginMutation = gql`
  mutation loginMutation($identifier: String!, $password: String!) {
    login(input: {identifier: $identifier, password: $password}) {
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

export const LoginConnector = connect(
  null,
  mapDispatchToProps
)(graphql(loginMutation)(D))
