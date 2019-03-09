/* eslint no-unused-vars: 0 */

import {graphql} from "react-apollo"
import React, {PureComponent} from "react"
import gql from "graphql-tag"
import {normalizeErrors} from "../utils/normalize-errors.js"
import isEmpty from "lodash/isEmpty"
/* import history from "../index.js" */

/* NOTE: Since this will file will be used by both client and app, it cannot use React or React Native Commands ie. <div> <View> */
export class F extends PureComponent {
  submit = async values => {
    try {
      const {
        data: {forgotPassword}
      } = await this.props.mutate({
        variables: {
          email: values.email
        }
      })
      return null
    } catch (err) {
      console.log("err: ", err)
    }
  }

  render() {
    return this.props.children({submit: this.submit})
  }
}

const forgotPasswordMutation = gql`
  mutation forgotPasswordMutation($email: String!) {
    forgotPassword(email: $email)
  }
`
export const ForgotPasswordConnector = graphql(forgotPasswordMutation)(F)
