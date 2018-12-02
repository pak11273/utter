/* eslint react/no-unescaped-entities: 0 */
/* eslint react/prefer-stateless-function: 0 */

import React, {PureComponent} from "react"
import {ForgotPasswordConnector} from "@utterzone/connector"

import ForgotPasswordView from "./forgot-password-view.js"

export default class ForgotPasswordCtrl extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <ForgotPasswordConnector>
          {({submit}) => <ForgotPasswordView submit={submit} />}
        </ForgotPasswordConnector> 
      </React.Fragment>
    )
  }
}
